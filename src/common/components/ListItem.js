
import React from 'react'
import { CourseListItem, CategoryListItem, LiveListItem,AwardListItem } from '.'
import { MyCoursesItem } from './MyCoursesItem'
import { UserListItem } from './UserListItem'
const ListItem = ({ item, itemLayout }) => {
    switch (itemLayout) {
        case 'user':
        case 'lesson':
            return <UserListItem itemLayout={itemLayout} item={item} actions={item.item.action} />
        case 'issue':
        case 'course':
            return <CourseListItem itemLayout={itemLayout} item={item} actions={item.item.action} />
        case 'live':
            return <LiveListItem itemLayout={itemLayout} item={item} actions={item.item.action} />
        case 'my_courses':
            return <MyCoursesItem itemLayout={itemLayout} item={item} actions={item.item.action} />
        case 'category':
            return <CategoryListItem item={item} actions={item.item.action} />
        case 'article':
            return <AwardListItem item={item} actions={item.item.action} />

        default: return null
    }
}
export { ListItem }