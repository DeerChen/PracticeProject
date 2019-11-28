# @Author: Senkita

library(RMySQL)
library(ggplot2)

conn <- dbConnect(MySQL(),
                  host='主机名',
                  user='用户名',
                  password='密码',
                  dbname='data')
on.exit(dbDisconnect(conn))
table <- dbListTables(conn,sql)[-70]
sql <- paste('select sum(tripduration) from `',table,'` group by hour(starttime);',sep='')
column.1 <- rep(0,24)
for (i in sql){
    num <- 1
    column.2 <- rep(NA,24)
    for (j in unlist(dbGetQuery(conn,i))){
        column.2[num] <- j
        num <- num + 1
    }
    column.1 <- cbind(column.1,column.2)
}
array.hour <- as.array(column.1)
sum.tripduration <- data.frame(cbind(day=0:23,tripduration=rowSums(array.hour)))
ggplot(data=sum.tripduration,mapping=aes(x=day,y=tripduration))+
       geom_bar(stat='identity')+
       scale_x_discrete(limit=0:23)+
       labs(title='日骑行高峰图',x='小时',y='骑行时长')+
       theme(plot.title=element_text(hjust=0.5),
             panel.background=element_rect(colour=1))
ggsave(filename='日骑行高峰图.png')