import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '../db'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.post('/admin/change-password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const userId = (req as any).user?.id

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const user = await prisma.adminUser.findUnique({ where: { id: userId } })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const valid = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!valid) {
      return res.status(400).json({ error: 'Current password is incorrect' })
    }

    const newHash = await bcrypt.hash(newPassword, 10)
    await prisma.adminUser.update({
      where: { id: userId },
      data: { passwordHash: newHash }
    })

    res.json({ success: true })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({ error: 'Failed to change password' })
  }
})

export default router
