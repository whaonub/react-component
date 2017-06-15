/**
 * Created by Aus on 2017/6/13.
 */
import React from 'react'
import classNames from 'classnames'
import Notification from './Notification'

// Toast组件比较特殊
// 因为<Toast />不会被直接渲染在DOM中
// 而是动态插入页面中
// 所以需要特殊注意 这种动态插入在React中是如何实现的
let newNotification;

// 获得一个Notification
function getNewNotification () {
    // 保持页面始终只有一个Notification
    if (!newNotification) {
        newNotification = Notification.reWrite();
    }

    return newNotification;
}

function notice(content, type, icon, duration = 3000, onClose, mask = true) {
    let notificationInstance = getNewNotification();

    notificationInstance.notice({
        duration,
        mask: mask,
        content: !!icon ? (
            <div className={
                classNames(['zby-toast-box',
                    {'info': type === 'info'},
                    {'success': type === 'success'},
                    {'warning': type === 'warning'},
                    {'error': type === 'error'}
                ])
            }>
                <div className="zby-toast-icon"><i className={"fa " + icon}></i></div>
                <div className="zby-toast-content">{content}</div>
            </div>
        ) : (
            <div className={
                classNames(['zby-toast-box',
                    {'info': type === 'info'},
                    {'success': type === 'success'},
                    {'warning': type === 'warning'},
                    {'error': type === 'error'}
                ])
            }>
                <div className="zby-toast-content">{content}</div>
            </div>
        ),
        onClose: () => {
            if (onClose) onClose();
        },
    });
}

export default {
    show (content, duration, icon, mask, onClose) {
        return notice(content, undefined, icon, duration, onClose, mask);
    },
    info(content, duration, icon, mask, onClose) {
        return notice(content, 'info', icon, duration, onClose, mask);
    },
    success(content, duration, icon, mask, onClose) {
        return notice(content, 'success', icon, duration, onClose, mask);
    },
    warning(content, duration, icon, mask, onClose) {
        return notice(content, 'warning', icon, duration, onClose, mask);
    },
    error(content, duration, icon, mask, onClose) {
        return notice(content, 'error', icon, duration, onClose, mask);
    }
}