const models = require("../../database/models");

exports.join = async (ctx) => {
  console.log("received")
  const userId = ctx.request.body.id;
  const user = await models.User.findOne({
      where: { id: userId },
  });
  ctx.assert(user, 401);

  const { id } = ctx.params;

  const course = await models.Course.findOne({
      where: { id },
      include: models.User,
  });
  ctx.assert(course, 400);

//   const exists = course.User.some((courseUser) => {
//       return courseUser.id === userId;
//   });

//   if (exists) {
//       ctx.status = 204;
//       return;
//   }

  course.addUser([user]);
  ctx.body = course.id;
  ctx.status = 200;
};

exports.list = async (ctx) => {
    console.log("course/list");
    const userId = ctx.request.body.id;
    const user = await models.User.findOne({
        where: { id: userId },
        include: models.Course,
    });
    
    var courselist = '';
    // console.log(user.Courses);
    for (i in user.Courses) {
        // console.log(user.Courses[i].name);
        courselist = courselist + user.Courses[i].name + ',';
    }
    courselist = courselist.slice(0, -1);
    console.log(courselist);
    ctx.body = courselist;
    ctx.status = 200;
}

exports.info = async (ctx) => {
    console.log("course/info");
    const { courseid } = ctx.params;
    
    const course = await models.Course.findOne({
        where: { id: courseid },
        // include: models.User,
    });
    ctx.assert(course, 400);
    ctx.body = course;
    ctx.status = 200;
}

exports.studentno = async (ctx) => {
    console.log("course/studentno");
    const { courseid } = ctx.params;

    const course = await models.Course.findOne({
        where: { id: courseid },
        include: models.User,
    });
    ctx.assert(course, 400);
    ctx.body = course.Users.length;
}