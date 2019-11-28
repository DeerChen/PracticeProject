# @Author: Senkita

library('RMySQL')

conn <- dbConnect(MySQL(),
                  host='主机名',
                  user='用户名',
                  password='密码',
                  dbname='data')
table.list <- unlist(dbListTables(conn))[-70]
sql.1 <- paste("update `",table.list,"` set `birth year`=NULL where `birth year` LIKE '_N';",sep='')
sql.2 <- paste("update `",table.list,"` set `birth year`=date_format(concat(`birth year`,'-01-01'),'%Y-%m-%d');",sep='')
sql.3 <- paste('alter table `',table.list,'` change `birth year` `birth year` datetime;',sep='')
sql.4 <- paste("update `",table.list,"` set usertype='Customer' where usertype is NULL;",sep='')
for (i in sql.1){
    dbGetQuery(conn,i)
}
for (i in sql.2){
    dbGetQuery(conn,i)
}
for (i in sql.3){
    dbGetQuery(conn,i)
}
for (i in sql.4){
    dbGetQuery(conn,i)
}