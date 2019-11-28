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
table.list <- unlist(dbListTables(conn))[-70]
sql.1 <- paste("select sum(tripduration) from `",table.list,'`;',sep='')
num.1 <- 1
data.tripduration <- NULL
for (i in sql.1){
    data.tripduration[num.1] <- as.numeric(dbGetQuery(conn,i))
    num.1 <- num.1 + 1
}
month_list <- NULL
num.2 <- 1
for (month.weather in substr(table.list,5,7)){
    month_list[num.2] <- month.weather
    num.2 <- num.2 + 1
}
tripduration.month <- data.frame(cbind(month=as.factor(month_list),tripduration=data.tripduration))
tripduration.month <- cbind(summarise(group_by(tripduration.month,month),sum=sum(tripduration)),type=factor(1))
ggplot(data=tripduration.month,aes(month,sum,colour=type))+
       geom_line()+
       labs(title='月总骑行时长变化图',x='月份',y='月总骑行时长')+
       scale_x_discrete(limit=(1:12))+
       scale_colour_hue('',breaks=c(1),labels=c('月总骑行时长'))+
       theme(plot.title=element_text(hjust=0.5),
             panel.background=element_rect(colour=1),
             legend.title.align=0.5,
             legend.position='bottom')
ggsave(filename='月总骑行时长变化图.png')

sql.2 <- 'select * from weather;'
table.weather <- dbGetQuery(conn,sql.2)
num.3 <- 1
year_list <- NULL
month_list <- NULL
for (i in strsplit(table.weather$date,'-')){
    year_list[num.3] <- unlist(i)[1]
    month_list[num.3] <- unlist(i)[2]
    num.3 <- num.3 + 1
}
year_list <- as.numeric(year_list)
month_list <- as.numeric(month_list)
data.weather <- data.frame(cbind(year=as.factor(year_list),
                                 month=as.factor(month_list),
                                 meanC=(table.weather$highC+table.weather$lowC)/2))
weather.month <- data.frame(cbind(summarise(group_by(data.weather,month),mean=mean(meanC)),type=factor(1)))
ggplot(data=weather.month,aes(month,mean,colour=type))+
       geom_line()+
       labs(title=expression(paste('月均温'^'*','变化图')),x='月份',y='月均温')+
       scale_x_discrete(limit=(1:12))+
       annotate('text',x=12,y=0,label='* 天气数据取自The Weather Channel',hjust='inward')+
       scale_colour_hue('',breaks=c(1),labels=c('月均温'))+
       theme(plot.title=element_text(hjust=0.5),
             panel.background=element_rect(colour=1),
             legend.title.align=0.5,
             legend.position='bottom')
ggsave(filename='月均温变化图.png')

data.compare <- data.frame(rbind(cbind(month=tripduration.month$month,
                                       num=tripduration.month$sum/(exp(sqrt(2))*10^8)),
                                 cbind(month=weather.month$month,
                                       num=weather.month$mean)),
                                 type=factor(c(rep(1,12),rep(2,12))))
ggplot(data=data.compare,aes(month,num,group=type,colour=type))+
       geom_line()+
       scale_x_discrete(limit=1:12)+
       scale_y_continuous(sec.axis=sec_axis(~.*(exp(sqrt(2))*10^8),name='月总骑行时长'))+
       labs(title='月总骑行时长和月均温变化关系图',x='月份',y='月均温')+
       scale_colour_hue('',breaks=c(1,2),labels=c('月总骑行时长','月均温'))+
       theme(plot.title=element_text(hjust=0.5),
             panel.background=element_rect(colour=1),
             legend.title.align=0.5,
             legend.position='bottom')
ggsave(filename='月总骑行时长和月均温变化关系图.png')

data.relationship <- data.frame(cbind(month=tripduration.month$month,
                                      '月总骑行时长'=tripduration.month$sum,
                                      '月均温'=weather.month$mean))
tiff(file='散点图矩阵.tiff',res=600,width=4800,height=4800,compression="lzw")
pairs(~月总骑行时长+月均温,data=data.relationship,main='散点图矩阵')
dev.off()

ggplot(data=data.relationship,aes(月均温,月总骑行时长))+
       geom_point()+
       geom_smooth(mapping=aes(月均温,月总骑行时长),data=data.relationship,method='lm')+
       labs(title='线性回归拟合',x='月均温',y='月总骑行时长')+
       theme(plot.title=element_text(hjust=0.5),
             panel.background=element_rect(colour=1))
ggsave(filename='线性回归拟合.png')

linear.regression <- lm(月总骑行时长~月均温,data=data.relationship)
summary(linear.regression)