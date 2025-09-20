import type { RouteRecordRaw } from "vue-router";

const courseRoutes: RouteRecordRaw[] = [
  {
    // 课程管理
    path: "course",
    name: "admin-course",
    component: () => import("@/views/course/CourseView.vue"),
  },
  {
    // 课程详细
    path: "course/:courseId",
    name: "admin-course-detail",
    component: () => import("@/views/course/CourseView.vue"),
  },
  {
    // 课程节点管理
    path: "course/:courseId/lesson",
    name: "admin-course-lesson",
    component: () => import("@/views/course/CourseLesson.vue"),
  },
  {
    // 课程节点详细
    path: "course/:courseId/lesson/:lessonId",
    name: "admin-course-lesson-detail",
    component: () => import("@/views/course/CourseLessonDetail.vue"),
  },
  {
    // 课程班级
    path: "course/:courseId/classes",
    name: "admin-course-classes",
    component: () => import("@/views/course/CourseClassesView.vue"),
  },
  {
    // 课程班级
    path: "course/:courseId/classes/:classId",
    name: "admin-course-classes-detail",
    component: () => import("@/views/course/CourseClassDetailView.vue"),
  },
];

export default courseRoutes;
