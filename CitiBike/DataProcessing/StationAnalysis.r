# @Author: Senkita

library(RMySQL)
library(dplyr)
library(doParallel)
library(foreach)

conn <- dbConnect(MySQL(),
                  host='主机名',
                  user='用户名',
                  password='密码',
                  dbname='data')
table <- dbListTables(conn)[-70]
on.exit(dbDisconnect(conn))
sql.most <- paste('select `start station name`,count(*) as num from `',table,'` group by `start station name` order by count(*) desc;',sep='')
sql.less <- paste('select `start station name`,count(*) as num from `',table,'` group by `start station name` order by count(*);',sep='')
fun <- function(i){
    conn <- dbConnect(MySQL(),
                      host='主机名',
                      user='用户名',
                      password='密码',
                      dbname='data')
    print(i)
    on.exit(dbDisconnect(conn))
    row.2 <- cbind(rep(NA,20),rep(NA,20))
    for (j in c(1:20)){
        row.2[j,1] <- as.character(dbGetQuery(conn,i)[j,1])
        row.2[j,2] <- as.numeric(dbGetQuery(conn,i)[j,2])
    }
    return(row.2)
}
cl.num <- detectCores()
cl <- makeCluster(cl.num)
result.most <- foreach(i = sql.most,
                       .combine=rbind,
                       .packages=c('RMySQL')) %dopar% fun(i)
stopCluster(cl)
result.1 <- data.frame(result.most,stringsAsFactors=FALSE)
result.1 <- data.frame(name=result.1$X1,times=as.numeric(result.1$X2),stringsAsFactors=F)
result.2 <- summarise(group_by(result.1,name),sum=sum(as.numeric(times)))
data.most <- result.2[order(result.2$sum,decreasing=TRUE),]
data.top <- data.most[1:10,]
write.csv(data.top,'top.csv')

cl.num <- detectCores()
cl <- makeCluster(cl.num)
result.less <- foreach(i = sql.less,
                       .combine=rbind,
                       .packages=c('RMySQL')) %dopar% fun(i)
stopCluster(cl)
result.3 <- data.frame(result.less,stringsAsFactors=FALSE)
result.3 <- data.frame(name=result.3$X1,times=as.numeric(result.3$X2),stringsAsFactors=F)
result.4 <- summarise(group_by(result.3,name),sum=sum(as.numeric(times)))
data.result <- result.4[order(result.4$sum),]
diff.day <- as.numeric(difftime(as.Date('2019-02-28'),as.Date('2013-06-01'),units='days'))
data.bottom <- data.result[data.result$sum<=diff.day,]
write.csv(data.bottom,'bottom.csv')