import { ChopWood } from './components/ChopWood'
import { Container } from '@/components/Container'
import { Generators } from './components/Generators'
import { OnboardingModal } from './components/OnboardingModal'
import { Stats } from './components/Stats'

export default function Home() {
  return (
    <div className="min-h-screen space-y-12 py-12">
      <Container size="small">
        <div className="grid h-screen grid-cols-3 gap-4">
          <div>
            <Stats />
          </div>

          <div className="col-span-2">
            <Generators />
            <ChopWood />
          </div>

          <OnboardingModal />
        </div>
      </Container>
    </div>
  )
}
