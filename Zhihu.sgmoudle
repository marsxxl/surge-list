// ==UserScript==
// @name         知乎屏蔽登录弹窗
// @namespace    https://github.com/nsznsznjsz/
// @version      0.3.0
// @description  屏蔽知乎问题界面的登录弹窗, 首部按钮登录依然可用
// @author       nsznsznjsz@outlook.com
// @match        https://www.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let disabled = false

    const body = document.body
    const html = document.documentElement

    const getModal = () => document.querySelector('.signFlowModal')

    const observer = new MutationObserver(() => {
        const modal = getModal()
        if (!disabled && modal) {
            let parent = modal.parentNode
            while (parent.parentNode !== body) parent = parent.parentNode
            body.removeChild(parent)
            html.style.overflow = 'auto'
            html.style.marginRight = 'auto'
        }
    })

    observer.observe(document.body, {
        childList: true,
        subtree: false
    })

    // watch login button
    const buttons = [
        document.querySelector('.AppHeader-login')
    ]
    const listener = () => {
        disabled = true
        setTimeout(() => {
            const close = document.querySelector('.Modal-closeButton')
            close.addEventListener('click', () => (disabled = false))
        }, 100)
    }
    buttons.map(button => button.addEventListener('click', listener))
})();
