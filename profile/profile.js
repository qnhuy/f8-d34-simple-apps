const ProfileCard = () => {
    // const user = fetch('https://jsonplaceholder.typicode.com/users/1')
    //     .then(response => response.json())
    //     .then(userResult => console.log(userResult))

    const [user, setUser] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        function handleFetchUser() {
            fetch('https://jsonplaceholder.typicode.com/users/1')
                .then(response => response.json())
                .then(userResult => setUser(userResult))
                .finally(() => setLoading(false))
        }
        handleFetchUser()
    }, [])

    return (
        <div className="wrapper">
            <header className="title">Profile Card</header>
            {loading ? (
                <div className="loader"></div>
            ) : (
                <div className="info">
                    <div className="image">
                        <img src="https://st2.depositphotos.com/1001094/11036/i/450/depositphotos_110364304-stock-photo-black-white-portrait-of-young.jpg" />
                    </div>
                    <div className="detail">
                        <p className="name">
                            <label>Name:&nbsp;</label>
                            {user?.name}
                        </p>
                        <p className="username">
                            <label>Username:&nbsp;</label>
                            {user?.username}
                        </p>
                        <p className="email">
                            <label>Email:&nbsp;</label>
                            {user?.email}
                        </p>
                        <p className="company">
                            <label>Company:&nbsp;</label>
                            {user?.company.name}
                        </p>
                        <p className="phone">
                            <label>Phone:&nbsp;</label>
                            {user.phone}
                        </p>
                        <p className="address">
                            <label>Address:&nbsp;</label>
                            {`${user?.address.suite} ${user?.address.street} ${user?.address.city}`}
                        </p>
                        <p className="website">
                            <label>Website:&nbsp;</label>
                            {user?.website}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

const app = <>
    <ProfileCard />
</>
ReactDOM.createRoot(document.getElementById('root')).render(app)