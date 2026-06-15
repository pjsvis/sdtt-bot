interface TestCase {
  id: string;
  input: string;
  expected_behavior: string;
}

interface TestConfig {
  test_cases: TestCase[];
}

interface EvalResult {
  testId: string;
  status: 'PASS' | 'FAIL';
  reasoning: string;
}
