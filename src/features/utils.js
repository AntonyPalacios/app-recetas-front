export const mat = entity => ([
    `${entity}/pending`,
    `${entity}/fulfilled`,
    `${entity}/rejected`,
])

export const mac = (type, ...argNames) => //retorna un action creator
    (...args) => {
        const action = {type}
        argNames.forEach((arg, index) =>{
            action[argNames[index]] = args[index]
        })
        return action
    }

export const asyncMac = asyncTypes => ([
    mac(asyncTypes[0]),
    mac(asyncTypes[1],'payload'),
    mac(asyncTypes[2],'error'),
])
