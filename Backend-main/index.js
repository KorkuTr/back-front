
const express = require('express');
const cors=require('cors');
const app = express();
// Middleware ayarları
app.use(cors());
app.use(express.json());
// Sabit veriler (sadece realizm için)
const recommendations = {
    'nihilizm': {
        books: [
            { 
                title: 'Ecce Homo', 
                author: 'Friedrich Nietzsche', 
                description: 'Nietzsche\'nin kendi felsefesini özetlediği otobiyografik eser',
                
            }
        ],
        movies: [
            { 
                title: 'Fight Club', 
                year: 1999, 
                director: 'David Fincher', 
                description: 'Modern toplumun anlamsızlığına dair sert bir eleştiri',
                
            }
        ]
    },
    'stoacılık': {
        books: [
            { 
                title: 'Meditasyonlar', 
                author: 'Marcus Aurelius', 
                description: 'Roma İmparatoru\'nun stoacı felsefe notları',
                
            }
        ],
        movies: [
            { 
                title: 'Gladyatör', 
                year: 2000, 
                director: 'Ridley Scott', 
                description: 'Stoacı erdemlerin sinemadaki en iyi temsillerinden',
                
            }
        ]
    },
    'varoluşçuluk': {
        books: [
            { 
                title: 'Bulantı', 
                author: 'Jean-Paul Sartre', 
                description: 'Varoluşun absürtlüğü üzerine temel eser',
                
            }
        ],
        movies: [
            { 
                title: 'Yeraltı', 
                year: 1995, 
                director: 'Emir Kusturica', 
                description: 'Varoluşsal bunalımın epik anlatımı',
            
            }
        ]
    },
    'feminizm': {
        books: [
            { 
                title: 'Kendi Odanız', 
                author: 'Virginia Woolf', 
                description: 'Kadın yazarların toplumsal konumuna dair manifesto',
                
            }
        ],
        movies: [
            { 
                title: 'Kız Çocuğu', 
                year: 2016, 
                director: 'Maren Ade', 
                description: 'Modern feminizmin sinemadaki en güçlü temsillerinden',
                
            }
        ]
    },
    'realizm': {
        books: [
            { title: 'Madame Bovary', author: 'Gustave Flaubert', description: 'Gerçekçi edebiyatin başyapıtlarından biri olan bu roman, burjuva yaşamının yüzeyselliğini eleştirir.' },
            { title: 'Savaş ve Barış', author: 'Lev Tolstoy', description: 'Tarihsel gerçekçiliğin en önemli örneklerinden biri, Napolyon dönemi Rusyasını anlatır.' },
            { title: 'Kırmızı ve Siyah', author: 'Stendhal', description: 'Toplumsal yükseliş ve aşk üzerine gerçekçi bir roman.' }
        ],
        movies: [
            { title: 'Bicycle Thieves (Bisiklet Hırsızları)', year: 1948, director: 'Vittorio De Sica', description: 'İtalyan Yeni Gerçekçilik akımının en önemli filmlerinden biri.' },
            { title: 'The Grapes of Wrath (Gazap Üzümleri)', year: 1940, director: 'John Ford', description: 'Büyük Buhran döneminde bir ailenin yaşadıklarını anlatır.' },
            { title: 'Tokyo Story (Tokyo Hikayesi)', year: 1953, director: 'Yasujirō Ozu', description: 'Japon aile yapısındaki değişimi gerçekçi bir şekilde ele alır.' }
        ],
        series: [
            { title: 'The Wire', year: '2002-2008', creator: 'David Simon', description: 'Baltimore\'daki uyuşturucu ticareti, liman işçileri, siyaset ve eğitim sistemini gerçekçi bir şekilde ele alır.' },
            { title: 'Mad Men', year: '2007-2015', creator: 'Matthew Weiner', description: '1960\'ların reklam dünyasını ve toplumsal değişimleri anlatır.' },
            { title: 'The Crown', year: '2016-', creator: 'Peter Morgan', description: 'Kraliçe II. Elizabeth\'in saltanatının tarihsel gerçeklere dayalı dramatizasyonu.' }
        ]
    }
};

// API endpoint: POST /recommend// GET Endpoint (Frontend için)
app.get('/api/recommend/:philosophy', (req, res) => {
    try {
      const philosophy = req.params.philosophy || 'realizm';
      const data = recommendations[philosophy];
      
      if (!data) {
        return res.status(404).json({
          error: `${philosophy} bulunamadı`,
          available: Object.keys(recommendations)
        });
      }
  
      res.json({
        success: true,
        philosophy,
        ...data
      });
      
    } catch (err) {
      console.error("API Hatası:", err);
      res.status(500).json({ error: "Sunucu hatası" });
    }
  });
  
  // POST Endpoint (Opsiyonel)
  app.post('/recommend', (req, res) => {
    const { philosophy } = req.body;
    // ... POST işlemleri
  });
  
  // Sunucu başlatma
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`✅ Sunucu http://localhost:${PORT} adresinde çalışıyor`);
    console.log(`📚 Kullanılabilir felsefeler: ${Object.keys(recommendations).join(', ')}`);
  });

