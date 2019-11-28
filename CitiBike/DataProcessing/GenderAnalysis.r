# @Author: Senkita

library(RMySQL)
library(dplyr)
library(ggplot2)

conn <- dbConnect(MySQL(),
                  host='主机名',
                  user='用户名',
                  password='密码',
                  dbname='data')
on.exit(dbDisconnect(conn))
table <- dbListTables(conn,sql)[-70]
sql <- paste('select count(*) from `',table,'` group by gender;',sep='')
column.1 <- rep(0,3)
for (i in sql){
    num <- 1
    column.2 <- rep(NA,3)
    for (j in unlist(dbGetQuery(conn,i))){
        column.2[num] <- j
        num <- num + 1
    }
    column.1 <- cbind(column.1,column.2)
}
array.gender <- as.array(column.1)
sum.gender <- rowSums(array.gender)
unknown.num <- data.frame(sum.gender)[1,]
male.num <- data.frame(sum.gender)[2,]
female.num <- data.frame(sum.gender)[3,]
people.num <-unknown.num+male.num+female.num
unknown.proportion <- paste(round(unknown.num/people.num*100,2),'%')
male.proportion <- paste(round(male.num/people.num*100,2),'%')
female.proportion <- paste(round(female.num/people.num*100,2),'%')
tiff(file = '用户性别比例.tiff', res = 600, width = 4800, height = 4800, compression = "lzw")
pie(sum.gender,labels=c(unknown.proportion,male.proportion,female.proportion),radius=0.8,main='用户性别比例',col=rainbow(3),clockwise=F)
legend('topleft',c('未知','男性','女性'),cex=1.5,fill=rainbow(3))
dev.off()

gender <- data.frame(t(array.gender)[-1,])
data.gender <- cbind(rbind(data.frame(month=1:69,gender=gender$X1),
                           data.frame(month=1:69,gender=gender$X2),
                           data.frame(month=1:69,gender=gender$X3)),
                     data.frame(type=as.factor(c(rep(1,69),rep(2,69),rep(3,69)))))
ggplot(data=data.gender,aes(month,gender,group=type,colour=factor(type)))+
       geom_line()+
       scale_x_discrete(limit=0:69,breaks=c(0,20,40,60),labels=c('2013-06','201502','201610','201806'))+
       labs(title='用户性别增长趋势图',x='月份',y='用户人数')+
       scale_colour_hue('',breaks=c(1,2,3),labels=c('未知','男性','女性'))+
       theme(plot.title=element_text(hjust=0.5),
             panel.background=element_rect(colour=1),
             legend.title.align=0.5,
             legend.position='bottom')
ggsave(filename='用户性别增长趋势图.png')