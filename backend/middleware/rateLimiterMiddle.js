
let rateLimit = new Map();

export default function rateLimiter() {
    return (req, res, next) => {

        if (req.url.startsWith('/imagesFolder') || req.url.startsWith('/image/getallimage')) {
            return next()
        } else {

        let reqLimit = 200;
        let timeLimit = 60 * 1000;
        let ip = req.ip;
        let now = Date.now();
        
        let checkLimit = rateLimit.get(ip) || {count: 0 , startTime : now}

        if(now - checkLimit.startTime < timeLimit){
            if(checkLimit.count >= reqLimit){
                return res.status(429).json({message : 'rate limit exceded for you'})
            }
            checkLimit.count++;
        } else {
            checkLimit.count = 0;
            checkLimit.startTime = now;
        }

        rateLimit.set(ip,checkLimit)
        next()
        }
    }
}