This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


/***********************************************
babel-plugin-import按需加载antd-mobile样式
"plugins": [
      [
        "import",
        {
          "libraryName": "antd-mobile",
          "style": "css"
        }
      ]
    ]
@babel/plugin-proposal-decorators 装饰器插件redux，connect
"plugins": [
              [
                "@babel/plugin-proposal-decorators",
                {
                  "legacy": true
                }
              ]
            ]
            
"proxy": "http://localhost:9093"转发端口，解决前后端跨域
cookie-parser处理cookie
redux，redux-router-dom，redux-thunk,react-redux
antd-mobile,axios,babel-plugin-import,mongoose,express
cookie-parser,
body-parser express中间件，用来接收解析请求参数
utility MD5加密插件,util.MD5(pwd)
prop-types类型检查
browser-cookies 清除cookies
immutable 库，不可变数据
函数式编程：
    /*function hello() {
        console.log("nihao")
    }
    function WrapperHello(fn) {
        return function () {
            console.log('qian')
            fn()
            console.log('hou')
        }
    }
    hello=WrapperHello(hello)
    hello()*/
    //高阶组件：属性代理：给原来的component加额外的属性
    /*function WrapperHello(Comp) {
        class WrapComp extends Component {
            render() {
                return (
                    <div>
                        <p>这是HOC高阶组建特有元素</p>
                        <Comp name='text' {...this.props}/>
                    </div>
                );
            }
        }
        return WrapComp
    }*/
    //反向继承 改写生命周期，修改渲染流程
    function WrapperHello(Comp) {
        class WrapComp extends Comp {
            componentDidMount() {
                console.log('高阶组件新增生命周期')
            }
            render() {
                return (
                    <Comp/>
                );
            }
        }
        return WrapComp
    }
    @WrapperHello
    class Hello extends Component {
        render() {
            return (
                <h2>hello</h2>
            );
        }
    }  
    Hello=WrapperHello(Hello)等价于@WrapperHello
Socket.io(服务端)
socket.io-client(客户端)
    基于事件的实时双向通信库
        基于websocket协议
        前后端通过事件进行双向通信
    用户发送信息传给socket，socket入库，广播全局，浏览器接收显示
遇到的问题：
    1，路由页面多次render，不能第一次获取redux的state，解决办法，先判断state，再进行return渲染
    2，直接启动localhost：3000，出现直接选中DashBoard渲染，解决办法：判断pathname，再进行return，否则return null
    3，tabBar开启fixed，置底，层级提升导致页面高度占整个div，会盖住下边的元素，导致按钮等无法触发，解决办法，给tabBar设置height
优化：
    1，相同功能模块抽离成单独组建，由其他组建调用
    2，尽量不使用页面刷新，而使用路由跳转
    3，高阶组件，属性代理，反向继承