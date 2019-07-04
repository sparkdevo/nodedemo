# node demo to test Azure Application Insights
 - 手动部署 demo 程序
 - 自动部署 demo 程序
 
# 手动部署 demo 程序
 - 构建容器镜像
 - 在 Azue 上创建 VM(ubuntu18.04)
 - 在 VM 中安装 docker
 - 在 VM 中运行 demo 程序
 - 在 VM 中安装 nginx
 - 配置 nginx

# 构建容器镜像
执行下面的命令构建容器镜像：  
```sh
$ docker build -t sparkdev/nodedemo:appinsightsdemo .
```
然后把镜像推送到 dockerhub：  
```sh
$ docker push sparkdev/nodedemo:appinsightsdemo
```

# 在 Azue 上创建 VM(ubuntu18.04)
创建用户 nick  
设置以秘钥认证方式登录 VM  
设置外界可以访问 VM 的 22 和 80 端口  

# 在 VM 中安装 docker
```sh
sudo apt-get update && \
sudo apt-get install -y apt-transport-https && \
sudo apt-get install -y ca-certificates && \
sudo apt-get install -y curl && \
sudo apt-get install -y software-properties-common && \
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

sudo apt-get update  
sudo apt-get -y install docker-ce  
sudo usermod -a -G docker nick  
```

# 在 VM 中运行 demo 程序
拉取容器镜像：  
```sh
$ docker pull sparkdev/nodedemo:appinsightsdemo  
```

运行应用程序：  
```sh
# -p 127.0.0.1:8080:3000 把端口映射到 localhost 的 8080  
$ docker run -d -p 127.0.0.1:3000:3000 --restart=always --name nodedemo sparkdev/nodedemo:appinsightsdemo  
```

# 在 VM 中安装 nginx
```sh
$ sudo apt update
$ sudo apt install nginx
```

# 配置 nginx
更新 VM 中 nginx 配置文件 /etc/nginx/nginx.conf 的内容如下：  
```sh
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
        worker_connections 768;
}

http {
        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        types_hash_max_size 2048;
	
        include /etc/nginx/mime.types;
        default_type application/octet-stream;
	
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;
	
        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;
	
        gzip on;
	
        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
        
        server {
            server_name mantis.eastasia.cloudapp.azure.com;
            location / {
                proxy_pass http://localhost:3000/;
            }

            listen 80;
        }
}
```
然后重新加载 nginx 配置文件：
```sh
$ sudo nginx -s reload
```

此时就可以通过浏览器访问 demo 程序了。
