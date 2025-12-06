import { ProjectDetector } from '../src/utils/project-detector.js';
import { ProjectScanner } from '../src/utils/project-scanner.js';

/**
 * Debug test for project scanner
 */
async function testProjectScanner() {
  console.log('🔍 Testing Project Scanner\n');
  
  try {
    // Test 1: Project Detection
    console.log('1️⃣ Testing basic project detection...');
    const detector = new ProjectDetector();
    const baseContext = await detector.detect();
    console.log('✅ Base context:', {
      framework: baseContext.framework,
      typescript: baseContext.typescript,
      styleFormat: baseContext.styleFormat,
      componentDir: baseContext.componentDir,
    });
    console.log('');

    // Test 2: Enhanced Scanning
    console.log('2️⃣ Testing enhanced project scanning...');
    const scanner = new ProjectScanner();
    const enhancedContext = await scanner.scan(baseContext);
    
    console.log('✅ Enhanced context:');
    console.log('  - Discovered components:', enhancedContext.discoveredComponents?.length || 0);
    if (enhancedContext.discoveredComponents && enhancedContext.discoveredComponents.length > 0) {
      console.log('    Examples:', enhancedContext.discoveredComponents.slice(0, 5).join(', '));
    }
    
    console.log('  - Design tokens:');
    if (enhancedContext.designTokens) {
      console.log('    Primary color:', enhancedContext.designTokens.primaryColor || 'not found');
      console.log('    Font family:', enhancedContext.designTokens.fontFamily || 'not found');
      console.log('    Spacing:', enhancedContext.designTokens.spacing || 'not found');
    } else {
      console.log('    No design tokens found');
    }
    
    console.log('  - Naming conventions:');
    if (enhancedContext.namingConventions) {
      console.log('    Component case:', enhancedContext.namingConventions.componentCase);
      console.log('    File case:', enhancedContext.namingConventions.fileCase);
    }
    
    console.log('  - Routing:', enhancedContext.routing || 'not detected');
    console.log('  - State management:', enhancedContext.stateManagement || 'not detected');
    console.log('  - Existing layouts:', enhancedContext.existingLayouts?.join(', ') || 'none found');
    
    console.log('\n✅ All tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test
testProjectScanner();
