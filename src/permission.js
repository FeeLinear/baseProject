import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import auth from '@/utils/auth' // auth base on sessionStorage

NProgress.configure({ showSpinner: false })// NProgress Configuration

const allowlist = ['/loading', '/noAccess', '/err', '/404', '/401','/demo']

/**
 * 路由导航守卫
 */
router.beforeEach((to, from, next) => {
  console.log('[router.beforeEach] ', to.path, from.path)
  NProgress.start() // start progress bar
  const currentUser = auth.get('currentUser')
  if (currentUser && currentUser.jsToken) { // validate jsToken
    next()
  } else {
    if (allowlist.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/noAccess')
      NProgress.done() // finish progress bar
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
