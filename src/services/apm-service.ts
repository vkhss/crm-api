import ElasticApmNode from 'elastic-apm-node'

class ApmService {
    public Init(): void {

        try {
            ElasticApmNode.start({
                serviceName: 'crm-api-apm',
                serverUrl: process.env.ELASTIC_URL,
                secretToken: process.env.ELASTIC_TOKEN,
                environment: 'local'
            })
            console.log('Elastic APM Started!')
        } catch (error) {
            console.log(error)
        }
    }
}

export { ApmService }