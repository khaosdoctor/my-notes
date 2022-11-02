## Zuul Revision notes

- Zuul is an API-GATEWAY application
- It handles all requests and perform dynamic routing of microservice applications
- It can also route requests to multiple AWS auto scaling group
- Zuul has mainly 4 types of filters that enable us to intercept traffic in different timelines of request processing for a particular transaction.
- We can add any number of filters for a particular url pattern.
![img](https://miro.medium.com/max/1400/0*P8YEqRqexDS4RHyb.png)
- **Pre-Filters**:Invoked before request is routed.
- **Post-Filters**:Invoked after request is routed.
- **Route-Filters**:Used to route the request.
- **Error-Filters**:Invoked when error occurs while handling requests


### Common Responsibilities of API-GAteway

- We can apply micro-service authentication and security in the gateway layer.
- We can do micro-services insights and monitoring of all the traffic that is going into the ecosystem.
- Dynamic Routing can help us to route requests to different back-end clusters as needed.
- We can do dynamic load shedding by allocating capacity for each type of request and dropping requests that go over the limit.
- We can apply static response handling which is building some responses directly at the edge instead of forwarding them to an internal cluster.
- We can do runtime stress testing by gradually increasing the traffic to a new cluster
