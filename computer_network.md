# 计算机网络

#### 互联网是什么？

服务的角度来看

- 分布式应用进程
- 为分布式进程提供通信的基础设施

> 基础设施包括应用层以下的所有协议实体。(传输层、网络层、链路层、物理层，不包括应用)

组成的角度来看

- 网络边缘



> 主机系统(PC，Smartphone，)
>
> 应用程序(服务端程序、应用端程序)

- 网络核心(进行全球范围内端到端的数据交换)

> 互联着的路由器、交换机
>
> 网络的网络

- 接入网、物理媒体

> 有线或无线通信链路



网络边缘通信模式

- 端系统(主机) 

  - 运行应用程序
  - 如web、email
  - 在“网络的边缘”

- 客户/服务器模式 

  - 客户端向服务器请求，接收服务
  - 如web浏览器/服务器  email客户端/服务器

  > 可扩展性较差，当客户端数达到一定数目，会影响服务器性能

- 对等(peer to peer)模式

  - 很少专门的服务器
  - 如Gnutella、emule

  > 如迅雷客户端，一个客户端，也能作为服务器端。分布式通信



#### 网络边缘

##### 采用网络设施的面向连接服务 （TCP协议

辨析:

> 面向连接，网络核心不知道连接状态，只在端系统中维护
>
> 有连接，网络核心中的节点同时维护。

目标：在端系统之间传输数据

握手：数据传输之前做好准备，两个通信主机之间为**连接建立状态**

TCP-传输控制协议

- Internet上面向连接的服务

TCP服务

- 可靠地、按顺序地传送数据 ： 确认和重传
- 流量控制： 发送方不会淹没接收方
- 拥塞控制：当网络拥塞时，发送方降低发送速率

##### 采用基础设施的无连接服务 （UDP协议

目标： 在端系统之间传输数据

无连接服务

UDP-用户数据协议

- 无连接
- 不可靠数据传输
- 无流量控制
- 无拥塞控制

> 使用TCP的应用： HTTP(Web)  FTP(文件传送)  Telnet(远程登录)  SMTP(email)

> 使用UDP的应用： 流媒体、远程会议、DNS、Internet电话