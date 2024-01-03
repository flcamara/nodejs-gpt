import express from 'express'
import sendMessageController from '../controller/sendMessageController.js'

const router = express.Router({mergeParams: true})

router.use('/send', sendMessageController.sendMessage)

export default router