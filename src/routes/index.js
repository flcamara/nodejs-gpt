import express from 'express'
import sendMessage from '../controller/sendMessageController'

const router = express.Router({mergeParams: true})

router.use('/send', sendMessage)

export default router