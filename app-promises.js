const users = [{
    id: 1,
    name: 'Sait',
    schoolId: 101
}, {
    id: 2,
    name: 'Keren',
    schoolId: 999
}];


const grades = [{
    id: 1,
    schoolId: 101,
    grade: 90
}, {
    id: 2,
    schoolId: 999,
    grade: 95
}, {
    id: 5,
    schoolId: 101,
    grade: 75
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);
        if (user) {
            resolve(user)
        } else {
            reject(`Unable to find user with id of ${id}`)
        }
    });
};


const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
};

const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;

        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }
        return `${user.name} has a ${average}% grades average in the class`;
    })
};

// using async await 
const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);

    let average = 0;

    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average}% grades average in the class`;
};

getStatusAlt(2).then((status) => {
    console.log(status);
})
    .catch((e) => {
        console.log(e);
    });