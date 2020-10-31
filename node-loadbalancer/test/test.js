const LoadBalancer = require('../service/LoadBalancer.js');

// unstable request simulation
function unstableRequest() {
    return new Promise((resolve, reject) => {
        if (Math.random() > .6) {
            resolve({ data: "Success" })
        } else {
            reject({ data: "Failed" })
        }
    })
}

const options = {
    state: "CLOSED",
    failureCount: 0,
    successCount: 0,
    nextAttempt: Date.now(),
    fallback: unstableRequest
};

const balancer = new LoadBalancer(unstableRequest, options);

setInterval(() => {
    balancer
        .fire()
        .then(console.log)
        .catch(console.error)
}, 1000);