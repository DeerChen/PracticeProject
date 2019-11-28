# @Author: Senkita

library(RMySQL)
library(dplyr)

conn <- dbConnect(MySQL(),
                  host='主机名',
                  user='用户名',
                  password='密码',
                  dbname='data')
on.exit(dbDisconnect(conn))
table <- dbListTables(conn,sql)[-70]
sql <- paste('select count(*) as num,year(now())-year(`birth year`) as age from `',table,'` group by year(now())-year(`birth year`);',sep='')
list.age <- rep(0,120)
for (i in sql){
    a <- dbGetQuery(conn,i)
    list.1 <- rep(0,120)
    for (i in c(1:lengths(a))){
        if(is.na(a[i,2])==FALSE){
            list.1[a[i,2]] <- a[i,1]
        }
    }
    list.age <- cbind(list.age,list.1)
}
age.proportion <- data.frame(cbind(age=c(1:120),people=rowSums(as.array(list.age))))
tiff(file = '用户年龄层分布图.tiff', res = 600, width = 4800, height = 4800, compression = "lzw")
barplot(age.proportion$people,main='年龄层比例',xlim=c(20,100),xlab='年龄',ylab='人数')
axis(side=1,at=seq(20,100,20),labels=c('20','40','60','80','100'))
dev.off()