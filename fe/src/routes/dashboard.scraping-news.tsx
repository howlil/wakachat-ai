import { createFileRoute } from '@tanstack/react-router'
import { Box, Heading } from '@chakra-ui/react'

export const Route = createFileRoute('/dashboard/scraping-news')({
  component: ScrapingNewsPage,
})

function ScrapingNewsPage() {
  return (
    <Box p={8}>
      <Heading size="lg" mb={4}>
        Scraping News
      </Heading>
    </Box>
  )
}
