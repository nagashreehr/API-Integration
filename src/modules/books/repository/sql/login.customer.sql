select id,username,password from customer 
where upper(username)=upper($(username)) 
and 
password=$(password)