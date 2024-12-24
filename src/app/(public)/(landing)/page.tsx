import { ChopWood } from './components/ChopWood'
import { Container } from '@/components/Container'
import { Generators } from './components/Generators'
import { OnboardingModal } from './components/OnboardingModal'
import { Stats } from './components/Stats'

export default function Home() {
  return (
    <div className="min-h-screen space-y-12 py-12">
      <Container size="xsmall">
        <div className="flex items-start justify-between">
          <div>
            <Generators />
            <ChopWood />
          </div>

          <Stats />
        </div>

        <OnboardingModal />
      </Container>
    </div>
  )
}
