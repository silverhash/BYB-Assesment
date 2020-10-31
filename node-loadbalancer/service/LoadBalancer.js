class LoadBalancer {
    constructor(request, options = {}) {
        console.log('Load balancer constructor ');
        const defaults = {
            failureThreshold: 3,
            successThreshold: 2,
            timeout: 6000,
            fallback: null
        }
        Object.assign(this, defaults, options, {
            request,
            state: "CLOSED",
            failureCount: 0,
            successCount: 0,
            nextAttempt: Date.now()
        });
    }

    async fire(httprequest) {
        console.log('Inside load balancer execution workflow');
        if (this.state === "OPEN") {
            if (this.nextAttempt <= Date.now()) {
                this.state = "HALF";
            } else {
                if (this.fallback) {
                    return this.tryFallback(httprequest);
                }
                throw new Error("Breaker is OPEN");
            }
        }
        try {
            console.log('Calling the primary request')
            const response = await this.request(httprequest);
            return this.success(response);
        } catch (err) {
            return this.fail(err);
        }
    }

    success(response) {
        if (this.state === "HALF") {
            this.successCount++;
            if (this.successCount > this.successThreshold) {
                this.successCount = 0;
                this.state = "CLOSED";
            }
        }
        this.failureCount = 0;

        this.status("Success");
        return response;
    }

    fail(err) {
        this.failureCount++;
        if (this.failureCount >= this.failureThreshold) {
            this.open();
        }
        this.status("Failure");
        if (this.fallback) return this.tryFallback();
        return err;
    }

    open() {
        this.state = "OPEN"
        this.nextAttempt = Date.now() + this.timeout
    }
    close() {
        this.successCount = 0
        this.failureCount = 0
        this.state = "CLOSED"
    }
    half() {
        this.state = "HALF"
    }

    async tryFallback(httprequest) {
        console.log("Attempting fallback request");
        try {
            const response = await this.fallback(httprequest);
            return response;
        } catch (err) {
            console('Fallback error --------->');
            return err;
        }
    }

    status(action) {
        console.table({
            Action: action,
            Timestamp: Date.now(),
            Successes: this.successCount,
            Failures: this.failureCount,
            "Next State": this.state
        })
    }
}

module.exports = LoadBalancer