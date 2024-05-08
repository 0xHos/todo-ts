create database todo;
go

use todo;
go

create table users(
	user_id varchar(100) not null,
	username varchar(100) not null unique,
	password varchar(300) not null,

	constraint pk_constraint primary key(user_id) 

);
go

create table tasks(
	task_id varchar(100) not null,
	user_id varchar(100) not null,
	title varchar(250) not null,
	content varchar(max) default('')
	constraint pk_tasks_constraint primary key(task_id),
	constraint fk_tasks_constraint foreign key(user_id) references users(user_id)
);
go


use todo;
alter table tasks add postedAt Date default(GETDATE() );


/*
	Task procedures
*/

-----------------------------------
create procedure sp_createTask @task_id varchar(100), @user_id varchar(100),@title varchar(250), @content varchar(max)
as
begin
	insert into tasks(task_id,user_id,title,content) values (@task_id,@user_id,@title,@content)
end
-------------------------------------------
create procedure sp_getTasksForUserByUserId  @user_id varchar(100) 
as
begin
	select task_id,title,content,postedAt from tasks where user_id = @user_id; 
end

-----------------------------------------------

create procedure sp_deleteTaskById @task_id varchar(100)
as
begin
	delete tasks where task_id = @task_id;
end
----------------------------------------

create procedure sp_getTaskById  @task_id varchar(100) 
as
begin
	select task_id,title,content,postedAt from tasks where task_id = @task_id; 
end
----------------------------------
create procedure sp_updateTaskById  @task_id  varchar(100), @title varchar(100) ,@content varchar(max) 
as
begin
	update tasks set title=@title, content=@content, postedAt=GETDATE()   where task_id = @task_id; 
end
--------------------------------------



create procedure sp_getTasksByTitle @title varchar(100)
as
begin
  select task_id, title, content, postedAt 
  from tasks
  where title like CONCAT('%', @title, '%') or title like CONCAT('%', @title) or title like CONCAT(@title, '%');
end
----------------------------------


/*
	procuders user
*/

create procedure sp_createUser @user_id varchar(100),@username varchar(100), @password varchar(300)
as
begin
	insert into users(user_id,username,password) values(@user_id,@username,@password)
end
-------------------------------------
create procedure sp_deleteUserById @user_id varchar(100) 
as
begin
	delete tasks where  user_id = @user_id ;
	delete users where user_id = @user_id
end

----------------------------------------------
create procedure sp_getUserByUsername @username varchar(100)
as
begin
	select * from users where username = @username;
end
--------------------------------------------------
