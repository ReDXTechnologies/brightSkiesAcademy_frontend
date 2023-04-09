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
    role: ['Teacher','Student_Teacher'],
    submenu: [],
  },

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
    path: '/admin/departments/head-department-profile',
    title: 'Profile',
    iconType: 'material-icons-two-tone',
    icon: 'person',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['head_sub_department','head_super_department'],
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
    path: '/admin/teachers/all-teachers',
    title: 'Teachers',
    iconType: 'material-icons-two-tone',
    icon: 'people_alt',
    class: 'menu-toggle',
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
      {
        path: '/admin/pending/hybrid-profile-confirmation',
        title: 'hybrid profile approval',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
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
      {
        path: '/admin/pending/hybrid-profile-confirmation',
        title: 'hybrid profile approval',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin','Super_Admin','head_sub_department'],
        submenu: [],
      },
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
    role: ['head_sub_department'],
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
        role: [],
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
        role: [],
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
        role: [],
        submenu: [],
      },
      {
        path: '/admin/pending/enrollement-confirmation',
        title: 'Approve enrollement',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [],
        submenu: [],
      },

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
    role: ['Admin','Super_Admin','head_super_department'],
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
        role: ['Admin','Super_Admin','head_super_department'],
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
        role: ['Admin','Super_Admin','head_super_department'],
        submenu: [],
      },
      {
        path: '/admin/pending/enrollement-confirmation',
        title: 'Approve enrollement',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [],
        submenu: [],
      },
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
    role: ['Teacher','Student','Student_Teacher'],
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
        role: [],
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
        role: [],
        submenu: [],
      },

    ],
  },

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
