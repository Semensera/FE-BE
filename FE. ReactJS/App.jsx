import { useState, useEffect } from 'react'

function App() {
  // 1. Стан для лічильника (Крок 29)
  const [count, setCount] = useState(0)
  
  // 2. Стан для інпуту (Крок 33)
  const [text, setText] = useState('')

  // 3. Масив для списку (Крок 31)
  const items = ['React', 'Vite', 'Bootstrap', 'Docker']

  // 4. Ефект для дебагу (Крок 32)
  useEffect(() => {
    console.log(`Лічильник змінився: ${count}`)
  }, [count])

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h1 className="text-primary">React + Bootstrap Practical</h1>
        
        <hr />

        {/* Секція лічильника */}
        <div className="mb-4">
          <h3>1. Лічильник: <span className="badge bg-secondary">{count}</span></h3>
          <button className="btn btn-success me-2" onClick={() => setCount(count + 1)}>
            Збільшити +
          </button>
          <button className="btn btn-danger" onClick={() => setCount(count - 1)}>
            Зменшити -
          </button>
        </div>

        {/* Секція вводу */}
        <div className="mb-4">
          <h3>2. Робота з інпутом</h3>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Введіть текст..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <p className="mt-2">Ви ввели: <strong>{text}</strong></p>
        </div>

        {/* Секція списку */}
        <div className="mb-4">
          <h3>3. Рендеринг списку (.map)</h3>
          <ul className="list-group">
            {items.map((item, index) => (
              <li key={index} className="list-group-item list-group-item-action">
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}

export default App