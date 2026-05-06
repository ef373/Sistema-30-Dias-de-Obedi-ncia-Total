export type DogAge = 'Filhote (0–1 ano)' | 'Jovem (1–5 anos)' | 'Adulto (5–10 anos)' | 'Idoso (10+)';
export type Frequency = 'Sim, muitas horas' | 'Algumas horas' | 'Quase nunca';
export type BehaviorWhenOut = 'Latir ou uivar' | 'Destruir objetos' | 'Ficar quieto, mas estranho' | 'Ficar normal';
export type GeneralBehavior = 'Ansiedade' | 'Agressividade' | 'Tristeza' | 'Nenhum';
export type ReactionWhenArriving = 'Muito agitado/desesperado' | 'Feliz, mas controlado' | 'Normal';
export type SleepQuality = 'Não, agitado' | 'Mais ou menos' | 'Sim, tranquilo';
export type SignsNoticed = 'Latidos excessivos' | 'Destruição de objetos' | 'Mudança de comportamento' | 'Não percebi nada';

export interface QuizResponses {
  age?: DogAge;
  aloneFrequency?: Frequency;
  behaviorWhenOut?: BehaviorWhenOut;
  generalBehavior?: GeneralBehavior;
  reactionAtArrival?: ReactionWhenArriving;
  sleepQuality?: SleepQuality;
  signsNoticed?: SignsNoticed;
}
