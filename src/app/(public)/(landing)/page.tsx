import { ChopWood } from './components/ChopWood'
import { Container } from '@/components/Container'

export default function Home() {
  return (
    <div className="min-h-screen space-y-12">
      <Container size="xsmall">
        <ChopWood />
      </Container>
    </div>
  )
}
