select * from book_info.book
WHERE (book_name=${book_name} OR ${book_name} IS NULL)
AND (book_genre=${book_genre} OR ${book_genre} IS NULL);
