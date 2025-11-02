import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [aiInput, setAiInput] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [nodes, setNodes] = useState<Array<{ x: number; y: number; connections: number[] }>>([]);

  useEffect(() => {
    const generatedNodes = Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      connections: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
        Math.floor(Math.random() * 20)
      ).filter(conn => conn !== i)
    }));
    setNodes(generatedNodes);
  }, []);

  const handleAiDemo = () => {
    if (!aiInput.trim()) return;
    
    setIsProcessing(true);
    setAiOutput('');
    
    setTimeout(() => {
      const response = `Анализ текста завершён:
      
• Обнаружено слов: ${aiInput.split(' ').length}
• Тональность: ${Math.random() > 0.5 ? 'Позитивная' : 'Нейтральная'}
• Уровень сложности: ${Math.random() > 0.6 ? 'Высокий' : 'Средний'}
• Ключевые термины: ${aiInput.split(' ').slice(0, 3).join(', ')}

Нейросеть обработала запрос за ${(Math.random() * 0.5 + 0.2).toFixed(2)}с`;
      
      setAiOutput(response);
      setIsProcessing(false);
    }, 1500);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Icon name="Brain" className="text-primary" size={32} />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                NeuroTech AI
              </span>
            </div>
            
            <div className="hidden md:flex gap-6">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'technology', label: 'Технология' },
                { id: 'capabilities', label: 'Возможности' },
                { id: 'cases', label: 'Кейсы' },
                { id: 'research', label: 'Исследования' },
                { id: 'contact', label: 'Контакты' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Будущее начинается с
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  искусственного интеллекта
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Революционная технология глубокого обучения для решения сложнейших задач
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => scrollToSection('technology')}>
                  Узнать больше
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')}>
                  Связаться с нами
                </Button>
              </div>
            </div>
            
            <div className="relative h-96 animate-scale-in">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {nodes.map((node, i) =>
                  node.connections.map((conn) => (
                    <line
                      key={`${i}-${conn}`}
                      x1={node.x}
                      y1={node.y}
                      x2={nodes[conn]?.x || 0}
                      y2={nodes[conn]?.y || 0}
                      stroke="currentColor"
                      strokeWidth="0.1"
                      className="text-primary/20"
                    />
                  ))
                )}
                {nodes.map((node, i) => (
                  <circle
                    key={i}
                    cx={node.x}
                    cy={node.y}
                    r="1"
                    className="fill-primary animate-pulse-slow"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section id="technology" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Интерактивная демонстрация</h2>
            <p className="text-xl text-muted-foreground">
              Попробуйте нашу AI-технологию в действии
            </p>
          </div>

          <Card className="max-w-4xl mx-auto animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Cpu" className="text-primary" size={24} />
                Анализ текста в реальном времени
              </CardTitle>
              <CardDescription>
                Введите любой текст для анализа с помощью нейросети
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Введите текст для анализа..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="min-h-32"
              />
              
              <Button 
                onClick={handleAiDemo} 
                disabled={isProcessing || !aiInput.trim()}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                    Обработка...
                  </>
                ) : (
                  <>
                    <Icon name="Play" className="mr-2" size={20} />
                    Запустить анализ
                  </>
                )}
              </Button>

              {aiOutput && (
                <div className="p-4 bg-muted rounded-lg animate-fade-in">
                  <pre className="whitespace-pre-wrap text-sm">{aiOutput}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="capabilities" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Возможности технологии</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Zap',
                title: 'Высокая скорость',
                description: 'Обработка данных в 100 раз быстрее традиционных методов'
              },
              {
                icon: 'Target',
                title: 'Точность 99.7%',
                description: 'Превосходная точность распознавания и классификации'
              },
              {
                icon: 'Layers',
                title: 'Масштабируемость',
                description: 'От малых задач до промышленных решений'
              },
              {
                icon: 'Shield',
                title: 'Безопасность',
                description: 'Защита данных на уровне банковских систем'
              },
              {
                icon: 'TrendingUp',
                title: 'Самообучение',
                description: 'Постоянное улучшение на основе новых данных'
              },
              {
                icon: 'Globe',
                title: 'Мультиязычность',
                description: 'Поддержка более 100 языков мира'
              }
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <CardHeader>
                  <Icon name={item.icon as any} className="text-primary mb-4" size={48} />
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Успешные кейсы</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                company: 'HealthTech Corp',
                metric: '+340%',
                description: 'Увеличение скорости диагностики заболеваний'
              },
              {
                company: 'FinanceAI',
                metric: '99.9%',
                description: 'Точность предсказания финансовых трендов'
              },
              {
                company: 'AutoDrive Systems',
                metric: '50M км',
                description: 'Безопасно пройдено автономными системами'
              },
              {
                company: 'RetailBot',
                metric: '-62%',
                description: 'Снижение операционных расходов'
              }
            ].map((item, i) => (
              <Card key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                <CardHeader>
                  <CardTitle className="text-2xl">{item.company}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-primary mb-2">{item.metric}</div>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="research" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Научные исследования</h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                title: 'Архитектура глубоких нейронных сетей',
                journal: 'Nature Machine Intelligence',
                year: '2024',
                citations: '1,247'
              },
              {
                title: 'Методы оптимизации обучения на больших данных',
                journal: 'Science Advances',
                year: '2024',
                citations: '892'
              },
              {
                title: 'Интерпретируемость решений нейросетей',
                journal: 'IEEE Transactions on AI',
                year: '2023',
                citations: '2,134'
              }
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Icon name="BookOpen" size={16} />
                        {item.journal}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={16} />
                        {item.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Quote" size={16} />
                        {item.citations} цитирований
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-xl text-muted-foreground">
              Готовы внедрить AI в ваш бизнес?
            </p>
          </div>

          <Card className="animate-scale-in">
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Имя</label>
                  <Input placeholder="Ваше имя" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Компания</label>
                  <Input placeholder="Название компании" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Сообщение</label>
                  <Textarea placeholder="Расскажите о вашем проекте..." className="min-h-32" />
                </div>
                
                <Button type="submit" className="w-full" size="lg">
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Icon name="Brain" className="text-primary" size={24} />
              NeuroTech AI
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Mail" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Linkedin" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 NeuroTech AI. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
