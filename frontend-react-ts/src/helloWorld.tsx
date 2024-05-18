import { useHelloWorldQuery } from "./backend-types-generated"
import { getApolloClient } from "./getApolloClient"

export const HelloWorld = () => {
    const {data, loading, error} = useHelloWorldQuery({
        // NOTE: this example intends to show the configuration of the 
        // apollo client, but the client shouldn't be recreated by every
        // request as here it is implemented:
        client: getApolloClient()
    })

    if (loading) {
        return <div>...loading</div>
    }
    if (error) {
        return <div>{error.message}</div>
    }
    return (<div>{data?.helloWorld}</div>)
}