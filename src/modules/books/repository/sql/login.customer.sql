select id,username,password from book_info.customer 
where upper(username)=upper($(username)) 
and 
password=$(password)