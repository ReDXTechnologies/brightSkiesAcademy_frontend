import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'MENUITEMS.MAIN.TEXT',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    role: ['All'],
    submenu: [],
  },
  {
    path: '/student/dashboard',
    title: 'MENUITEMS.STUDENT.LIST.DASHBOARD',
    iconType: 'material-icons-two-tone',
    icon: 'space_dashboard',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Student'],
    submenu: [],
  },
      {
        path: '/student/student-profile',
        title: 'Profile',
        iconType: 'material-icons-two-tone',
        icon: 'person',
        class: '',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Student'],
        submenu: [],
      },
  {
    path: '/teacher/teacher-profile',
    title: 'Profile',
    iconType: 'material-icons-two-tone',
    icon: 'person',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Teacher'],
    submenu: [],
  },
  // {
  //   path: '/teacher/students',
  //   title: 'My students',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'people_alt',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['Teacher'],
  //   submenu: [],
  // },
  // Admin Modules

  {
    path: '/admin/dashboard/main',
    title: 'MENUITEMS.DASHBOARD.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'space_dashboard',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin','Super_Admin','head_sub_department','head_super_department'],
    submenu: [],
  },
  {
    path: '',
    title: 'MENUITEMS.DEPARTMENTS.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'business',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['head_super_department'],
    submenu: [
      {
        path: '/admin/departments/all-departments',
        title: 'All Departments',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/departments/add-sub-department',
        title: 'Add Sub department',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      }
    ],
  },

  {
    path: '',
    title: 'MENUITEMS.DEPARTMENTS.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'business',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin','Super_Admin'],
    submenu: [
      {
        path: '/admin/departments/all-departments',
        title: 'MENUITEMS.DEPARTMENTS.LIST.ALL-DEPARTMENT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/departments/add-super-department',
        title: 'Add super department',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin','Super_Admin'],
        submenu: [],
      },
      {
        path: '/admin/departments/add-sub-department',
        title: 'Add Sub department',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      }
    ],
  },

  {
    path: '/admin/students/all-students',
    title: 'MENUITEMS.STUDENTS.LIST.ALL-STUDENTS',
    iconType: 'material-icons-two-tone',
    icon: 'people_alt',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin','Super_Admin'],
    submenu: [],
  },
  {
    path: '/shared/courses',
    title: 'MENUITEMS.COURSES.LIST.ALL-COURSES',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Student'],
    submenu: [],
  },

  // {
  //   path: '',
  //   title: 'MENUITEMS.TEACHERS.TEXT',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'person',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['Admin'],
  //   submenu: [
  //     {
  //       path: '/admin/teachers/all-teachers',
  //       title: 'MENUITEMS.TEACHERS.LIST.ALL-TEACHERS',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //     {
  //       path: '/admin/teachers/add-teacher',
  //       title: 'MENUITEMS.TEACHERS.LIST.ADD-TEACHER',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //     {
  //       path: '/admin/teachers/edit-teacher',
  //       title: 'MENUITEMS.TEACHERS.LIST.EDIT-TEACHER',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //     {
  //       path: '/admin/teachers/about-teacher',
  //       title: 'MENUITEMS.TEACHERS.LIST.ABOUT-TEACHER',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //   ],
  // },
  {
    path: '/admin/teachers/all-teachers',
    title: 'Teachers',
    iconType: 'material-icons-two-tone',
    icon: 'people_alt',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['head_super_department'],
    submenu: [
      {
        path: '/admin/teachers/all-teachers',
        title: 'Super department teachers',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['head_super_department'],
        submenu: [],
      },
      // {
      //   path: '/admin/pending/account-confirmation',
      //   title: 'Accounts approval',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   role: ['Admin','Super_Admin'],
      //   submenu: [],
      // },
    ]

  },
  {
    path: '/admin/teachers/all-teachers',
    title: 'Teachers',
    iconType: 'material-icons-two-tone',
    icon: 'people_alt',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['head_sub_department'],
    submenu: [
      {
        path: '/admin/teachers/all-teachers',
        title: 'Sub department teachers',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['head_sub_department'],
        submenu: [],
      },
      // {
      //   path: '/admin/pending/account-confirmation',
      //   title: 'Accounts approval',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   role: ['Admin','Super_Admin'],
      //   submenu: [],
      // },
    ]

  },
  {
    path: '/admin/teachers/all-teachers',
    title: 'Teachers',
    iconType: 'material-icons-two-tone',
    icon: 'people_alt',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin','Super_Admin'],
    submenu: [
      {
        path: '/admin/teachers/all-teachers',
        title: 'MENUITEMS.TEACHERS.LIST.ALL-TEACHERS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin','Super_Admin'],
        submenu: [],
      },
      {
        path: '/admin/pending/account-confirmation',
        title: 'Accounts approval',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin','Super_Admin'],
        submenu: [],
      },
      ]

  },

  //
  //
  // {
  //   path: '/admin/teachers/accounts-pending',
  //   title: 'Accounts approval',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'people_alt',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['Admin','Super_Admin'],
  //   submenu: [],
  // },
 //courses admin
  {
    path: 'shared/courses',
    title: 'Courses',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin','Super_Admin','head_sub_department','head_super_department'],
    submenu: [
      {
        path: 'shared/courses',
        title: 'All courses',
        iconType: '',
        icon: '',
        class: '',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin','Super_Admin','head_sub_department','head_super_department'],
        submenu: [],
      },
      {
        path: '/admin/pending/course-confirmation',
        title: 'Approve courses',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin','Super_Admin','head_sub_department','head_super_department'],
        submenu: [],
      },
      // {
      //   path: '/shared/add-course',
      //   title: 'Edit course',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   role: ['Admin','Super_Admin','Teacher'],
      //   submenu: [],
      // }
    ],
  },
  {
    path: 'shared/courses',
    title: 'Courses',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Teacher'],
    submenu: [
      {
        path: '/shared/courses',
        title: 'All courses',
        iconType: '',
        icon: '',
        class: '',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Teacher'],
        submenu: [],
      },
      {
        path: '/shared/add-course',
        title: 'Add course',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin','Super_Admin','Teacher'],
        submenu: [],
      },
      // {
      //   path: '/shared/add-course',
      //   title: 'Add tutorial course',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   role: ['Admin','Super_Admin','Teacher'],
      //   submenu: [],
      // }
    ],
  },
  //staff
  // {
  //   path: '',
  //   title: 'MENUITEMS.STAFF.TEXT',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'face',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['Admin'],
  //   submenu: [
  //     {
  //       path: '/admin/staff/all-staff',
  //       title: 'MENUITEMS.STAFF.LIST.ALL-STAFF',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //     {
  //       path: '/admin/staff/add-staff',
  //       title: 'MENUITEMS.STAFF.LIST.ADD-STAFF',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //     {
  //       path: '/admin/staff/edit-staff',
  //       title: 'MENUITEMS.STAFF.LIST.EDIT-STAFF',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //     {
  //       path: '/admin/staff/about-staff',
  //       title: 'MENUITEMS.STAFF.LIST.ABOUT-STAFF',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //   ],
  // },
  //holiday
  // {
  //   path: '',
  //   title: 'MENUITEMS.HOLIDAY.TEXT',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'airline_seat_individual_suite',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['Admin'],
  //   submenu: [
  //     {
  //       path: '/admin/holidays/all-holidays',
  //       title: 'MENUITEMS.HOLIDAY.LIST.ALL-HOLIDAY',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //     {
  //       path: '/admin/holidays/add-holiday',
  //       title: 'MENUITEMS.HOLIDAY.LIST.ADD-HOLIDAY',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //     {
  //       path: '/admin/holidays/edit-holiday',
  //       title: 'MENUITEMS.HOLIDAY.LIST.EDIT-HOLIDAY',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //   ],
  // },
  // {
  //   path: '',
  //   title: 'MENUITEMS.FEES.TEXT',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'monetization_on',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['Admin','Super_Admin'],
  //   submenu: [
  //     {
  //       path: '/admin/fees/all-fees',
  //       title: 'MENUITEMS.FEES.LIST.ALL-FEES',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //     {
  //       path: '/admin/fees/fee-receipt',
  //       title: 'MENUITEMS.FEES.LIST.FEE-RECEIPT',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //   ],
  // },
  //aatendance details , sheet
  // {
  //   path: '',
  //   title: 'MENUITEMS.ATTENDANCE.TEXT',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'history_edu',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['Admin'],
  //   submenu: [
  //
  //     {
  //       path: '/admin/attendance/attendance-sheet',
  //       title: 'MENUITEMS.ATTENDANCE.LIST.SHEET',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: ['Admin'],
  //       submenu: [],
  //     },
  //   ],
  // },



  // {
  //   path: '/shared/attendance/details',
  //   title: 'MENUITEMS.ATTENDANCE.LIST.DETAILS',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'history_edu',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['Student'],
  //   submenu: [],
  // },
  // Common Module

  // {
  //   path: '/timeline/timeline2',
  //   title: 'Timeline ',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'timeline',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['All'],
  //   submenu: [],
  // },
  // {
  //   path: 'calendar',
  //   title: 'MENUITEMS.CALENDAR.TEXT',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'event_note',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: 'badge bg-blue sidebar-badge float-end',
  //   role: ['All'],
  //   submenu: [],
  // },
//email
//   {
//     path: '',
//     title: 'Email',
//     iconType: 'material-icons-two-tone',
//     icon: 'email',
//     class: 'menu-toggle',
//     groupTitle: false,
//     badge: '',
//     badgeClass: '',
//     role: ['All'],
//     submenu: [
//       {
//         path: '/email/inbox',
//         title: 'Inbox',
//         iconType: '',
//         icon: '',
//         class: 'ml-menu',
//         groupTitle: false,
//         badge: '',
//         badgeClass: '',
//         role: [''],
//         submenu: [],
//       },
//       {
//         path: '/email/compose',
//         title: 'Compose',
//         iconType: '',
//         icon: '',
//         class: 'ml-menu',
//         groupTitle: false,
//         badge: '',
//         badgeClass: '',
//         role: [''],
//         submenu: [],
//       },
//       {
//         path: '/email/read-mail',
//         title: 'Read Email',
//         iconType: '',
//         icon: '',
//         class: 'ml-menu',
//         groupTitle: false,
//         badge: '',
//         badgeClass: '',
//         role: [''],
//         submenu: [],
//       },
//     ],
//   },


  //profilem pricingm invoice m fqas
  // {
  //   path: '',
  //   title: 'Extra Pages',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'description',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['Admin'],
  //   submenu: [
  //     {
  //       path: '/extra-pages/profile',
  //       title: 'Profile',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //     {
  //       path: '/extra-pages/pricing',
  //       title: 'Pricing',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //     {
  //       path: '/extra-pages/invoice',
  //       title: 'Invoice',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //     {
  //       path: '/extra-pages/faqs',
  //       title: 'Faqs',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //     {
  //       path: '/extra-pages/blank',
  //       title: 'Blank Page',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       submenu: [],
  //     },
  //   ],
  // },

  {
    path: '/shared/settings',
    title: 'Security settings',
    iconType: 'material-icons-two-tone',
    icon: 'settings',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['All'],
    submenu: [],
  },
];
