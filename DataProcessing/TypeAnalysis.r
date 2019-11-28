@Author: Senkita

library(RMySQL)
library(dplyr)

conn <- dbConnect(MySQL(),
                  host='主机名',
                  user='用户名',
                  password='密码',
                  dbname='data')
on.exit(dbDisconnect(conn))
table <- dbListTables(conn,sql)[-70]
sql <- paste('select count(*)  from `',table,'` group by usertype;',sep='')
column.1 <- rep(0,2)
for (i in sql){
    num <- 1
    column.2 <- rep(NA,2)
    for (j in unlist(dbGetQuery(conn,i))){
        column.2[num] <- j
        num <- num + 1
    }
    column.1 <- cbind(column.1,column.2)
}
array.usertype <- as.array(column.1)
sum.usertype <- rowSums(array.usertype)
customer.num <- data.frame(sum.usertype)[1,]
subscriber.num <- data.frame(sum.usertype)[2,]
people.num <-customer.num+subscriber.num
customer.proportion <- paste(round(customer.num/people.num*100,2),'%')
subscriber.proportion <- paste(round(subscriber.num/people.num*100,2),'%')
tiff(file = '用户类型比例图.tiff', res = 600, width = 4800, height = 4800, compression = "lzw")
pie(sum.usertype,labels=c(customer.proportion,subscriber.proportion),radius=0.8,main='用户类型比例',col=rainbow(2),clockwise=F)
legend('topleft',c('普通用户','订阅用户'),cex=1.5,fill=rainbow(2))
dev.off()