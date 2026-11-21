import type { Hotspot } from './viewer'

export interface Room {
  id: string
  name: string
  image: string
  alt: string
  width: number
  height: number
  m2: number
  guests: string
  /** Illustrative price per night. */
  from: number
  hotspots: Hotspot[]
}

export const rooms: Room[] = [
  {
    id: 'suite', name: 'Σουίτα με θέα', image: 'sea-suite', alt: 'Σουίτα με θέα τη θάλασσα', width: 1024, height: 768, m2: 38, guests: '2 + 1', from: 140,
    hotspots: [
      { id: 'bed', x: 76, y: 70, label: 'Κρεβάτι 180 × 200', title: 'Διπλό κρεβάτι', text: 'Στρώμα 180 × 200 με λινά σεντόνια. Το κρεβάτι κοιτάζει προς τη βεράντα.' },
      { id: 'terrace', x: 50, y: 34, label: 'Βεράντα 14 m²', title: 'Βεράντα με θέα', text: '14 m², καρέκλες και τραπεζάκι. Βλέπει νότια, προς τον κόλπο.' },
      { id: 'chair', x: 11, y: 62, label: 'Πολυθρόνα', title: 'Πολυθρόνα', text: 'Μια γωνιά για διάβασμα ή για τον πρωινό καφέ, δίπλα στα παράθυρα.' },
      { id: 'lamp', x: 92, y: 30, label: 'Φωτισμός', title: 'Φωτισμός δίπλα στο κρεβάτι', text: 'Ζεστό, χαμηλό φως με ξεχωριστό διακόπτη για κάθε πλευρά.' },
    ],
  },
  {
    id: 'garden', name: 'Δίκλινο με κήπο', image: 'garden-double', alt: 'Δίκλινο δωμάτιο με κήπο', width: 1024, height: 768, m2: 26, guests: '2', from: 95,
    hotspots: [
      { id: 'beds', x: 70, y: 72, label: 'Δύο κρεβάτια 90 × 200', title: 'Δύο κρεβάτια', text: 'Δύο μονά κρεβάτια 90 × 200 που μπορούν να ενωθούν σε διπλό. Πείτε μας πριν την άφιξη.' },
      { id: 'door', x: 38, y: 46, label: 'Έξοδος στην αυλή', title: 'Πόρτα στην αυλή', text: 'Βγαίνετε απευθείας στην αυλή με την ελιά και τη μπουκαμβίλια.' },
      { id: 'wood', x: 14, y: 70, label: 'Έπιπλα από ξύλο ελιάς', title: 'Ξύλο ελιάς', text: 'Τραπεζάκι και πάγκοι από ξύλο ελιάς του νησιού. Κάθε κομμάτι έχει διαφορετικό σχέδιο.' },
      { id: 'lamp', x: 95, y: 63, label: 'Φωτιστικό', title: 'Φωτισμός', text: 'Στρογγυλά φωτιστικά δίπλα σε κάθε κρεβάτι.' },
    ],
  },
  {
    id: 'bath', name: 'Μπάνιο', image: 'bathroom', alt: 'Μπάνιο με ντους', width: 1024, height: 1024, m2: 7, guests: '—', from: 0,
    hotspots: [
      { id: 'shower', x: 80, y: 19, label: 'Ντους', title: 'Ντουζιέρα', text: 'Ντους χωρίς κατώφλι, με κεφαλή βροχής και γυάλινο διαχωριστικό.' },
      { id: 'basin', x: 30, y: 71, label: 'Νιπτήρας', title: 'Ράφι νιπτήρα', text: 'Ξύλινο ράφι με χώρο για τα προσωπικά σας και καθαρές πετσέτες.' },
      { id: 'mirror', x: 30, y: 44, label: 'Καθρέφτης', title: 'Στρογγυλός καθρέφτης', text: 'Μεγάλος καθρέφτης πάνω από τον νιπτήρα.' },
      { id: 'window', x: 50, y: 26, label: 'Παράθυρο', title: 'Φυσικό φως', text: 'Παράθυρο που ανοίγει, για αερισμό και φως όλη την ημέρα.' },
    ],
  },
]
