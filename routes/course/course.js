const models = require('@models');
const { checkAndGetUserId } = require('@utils/auth');

exports.userCourses = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);

  const user = await models.User.findOne({
    where: { id: UserId },
    include: models.Course,
  });

  ctx.body = user.Courses;
};

exports.courseInfo = async (ctx) => {
  const CourseId = ctx.params.courseId;
  ctx.assert(CourseId, 400, '400: Course ID not sent');

  const course = await models.Course.findOne({ where: { id: CourseId } });

  ctx.assert(course, 404, '404: Course not found');

  ctx.body = course;
};

exports.courseLectures = async (ctx) => {
  const { code } = ctx.params;
  ctx.assert(code, 400, '400: Course code not sent');

  const course = await models.Course.findOne({
    where: { code },
    include: [
      {
        model: models.Lecture,
        attributes: ['number', 'date'],
        include: [
          {
            model: models.Keyword,
            attributes: ['word'],
          },
        ],
      },
    ],
    order: [[models.Lecture, 'number', 'ASC']],
  });

  ctx.assert(course, 404, '404: Course not found');

  ctx.body = course.Lectures;
};

exports.join = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);

  const user = await models.User.findOne({ where: { id: UserId } });

  const CourseId = ctx.params.courseId;
  ctx.assert(CourseId, 400, '400: Course ID not sent');

  const course = await models.Course.findOne({ where: { id: CourseId } });

  ctx.assert(course, 404, '404: Course not found');

  await course.addUser(user);

  ctx.body = course.id;
};
