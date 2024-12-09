import { Container } from '@/components/Container'
import { DigButton } from './components/DigButton'
import { RewardCards } from './components/RewardCards'
import { Stats } from './components/Stats'
import { XpBar } from './components/XpBar'

export default function Home() {
  return (
    <div className="min-h-screen space-y-12">
      <XpBar />

      <Container>
        <Stats />

        <div>
          <DigButton />
        </div>

        <RewardCards />
      </Container>
    </div>
  )
}
