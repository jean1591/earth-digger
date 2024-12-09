import { Container } from '@/components/Container'
import { DigButton } from './components/DigButton'
import { Inventory } from './components/Inventory'
import { RewardCards } from './components/RewardCards'
import { Stats } from './components/Stats'
import { XpBar } from './components/XpBar'

export default function Home() {
  return (
    <div className="min-h-screen space-y-12">
      <XpBar />

      <Container>
        <Stats />

        <div className="space-y-8">
          <DigButton />

          <div className="grid grid-cols-3 gap-8">
            <Inventory />
          </div>
        </div>

        <RewardCards />
      </Container>
    </div>
  )
}
