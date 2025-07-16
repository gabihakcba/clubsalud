// components/pdf/RendimientoPDF.tsx
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from '@react-pdf/renderer'
import { type ReactElement } from 'react'

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 20 },
  header: { fontSize: 18, marginBottom: 10 },
  image: { width: '100%', height: 300, objectFit: 'contain' }
})

export function RendimientoPDF({
  chartImage,
  resumen
}: {
  chartImage: string // base64
  resumen: { ingresos: number; egresos: number; balance: number }
}): ReactElement {
  return (
    <Document>
      <Page
        size='A4'
        style={styles.page}
      >
        <Text style={styles.header}>Reporte Anual de Rendimiento</Text>

        <View style={styles.section}>
          <Text>Ingresos: ${resumen.ingresos}</Text>
          <Text>Egresos: ${resumen.egresos}</Text>
          <Text>Balance: ${resumen.balance}</Text>
        </View>

        <View style={styles.section}>
          <Text>Gráfico de evolución</Text>
          <Image
            style={styles.image}
            src={chartImage}
          />
        </View>
      </Page>
    </Document>
  )
}
