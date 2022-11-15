import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { getUsersPage } from './api/axios';
import User from './User';
import PageButton from './PageButton';
//https://www.youtube.com/watch?v=9ZbdwL5NSuQ
const Example2 = () => {
    const [page, setPage] = useState(1);

    const {
        isLoading,
        isError,
        error,
        data: users,
        isFetching,
        isPreviousData,
    } = useQuery(['/users', page], () => getUsersPage(page), {
        keepPreviousData: true,
    })

    if (isLoading) return <p>Loading Users...</p>

    if (isError) return <p>Error: {error.message}</p>

    const content = users.data.map(user => <User key={user.id} user={user} />)

    const nextPage = () => setPage(prev => prev + 1)

    const prevPage = () => setPage(next => next -1)

    const pagesArray = Array(users.total_pages).fill().map((_, index) => index + 1)

    const nav = (
        <nav className='nav-ex2'>
            <button onClick={prevPage} disabled={isPreviousData || page === 1}>&lt;&lt;</button>
            {pagesArray.map(pg => <PageButton key={pg} pg={pg} setPage={setPage} isPreviousData={isPreviousData} />)}
            <button onClick={nextPage} disabled={isPreviousData || page === users.total_pages}>&gt;&gt;</button>
        </nav>
    )

    return (
        <>
            {nav}
            {isFetching && <span className='loading'>Loading...</span>}
            {content}
        </>
    )
}

export default Example2
