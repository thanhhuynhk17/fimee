// Replace secret with your own
let secret = process.env.REACT_APP_SECRET

function objKeySort(obj) {
    let newKey = Object.keys(obj).sort()
    let newObj = {}
    for (let i = 0; i < newKey.length; i++) {
        newObj[newKey[i]] = obj[newKey[i]]
    }
    return newObj
}

function getEnvVar(k) {
    let v = pm.variables.get(k)
    if (v != null) {
        return v
    }
    v = pm.environment.get(k)
    if (v != null) {
        return v
    }
    v = pm.globals.get(k)
    if (v != null) {
        return v
    }
    return null
}

let ts = Date.parse(new Date()) / 1000
pm.variables.set("timestamp", ts)

calSign = function(secret) {
    let ts = getEnvVar("timestamp")
    let queryParam = pm.request.url.query.members
    let param = {}
    for (let item in queryParam) {
        if (queryParam[item].key == "timestamp") {
            v = ts
        } else {
            let v = queryParam[item].value
            if (v == null || v == "{{" + queryParam[item].key + "}}") {
                v = getEnvVar(queryParam[item].key)
            }
        }
        param[queryParam[item].key] = v
    }

    delete param["sign"];
    delete param["access_token"]
    let sortedObj = objKeySort(param)
    let signstring = secret + pm.request.url.getPath()
    for (let key in sortedObj) {
        signstring = signstring + key + sortedObj[key]
    }
    signstring = signstring + secret
    console.log(signstring)
    sign = CryptoJS.HmacSHA256(signstring, secret).toString()
    return sign
}

let sign = calSign(secret)
