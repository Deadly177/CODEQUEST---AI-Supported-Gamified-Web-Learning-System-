import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const componentPath = path.resolve('frontend/src/app/components/BuildWorkspace.tsx');
const source = fs.readFileSync(componentPath, 'utf8');

test('BuildWorkspace creates a complete preview document with HTML, CSS, and JavaScript sections', () => {
  assert.match(source, /const previewDocument = useMemo/);
  assert.match(source, /<!doctype html>/i);
  assert.match(source, /<style>\$\{css\}<\/style>/);
  assert.match(source, /\$\{html\}/);
  assert.match(source, /<script>\$\{javascript\}<\\\/script>/);
});

test('BuildWorkspace preview iframe uses srcDoc for the generated preview document', () => {
  assert.match(source, /srcDoc=\{previewDocument\}/);
  assert.match(source, /title="Live build preview"/);
});

test('BuildWorkspace preview iframe allows scripts but does not allow same-origin access', () => {
  assert.match(source, /sandbox="allow-scripts"/);
  assert.doesNotMatch(source, /sandbox="[^"]*allow-same-origin/);
});

test('BuildWorkspace supports reset and create-new project workflows', () => {
  assert.match(source, /const resetProject = \(\) =>/);
  assert.match(source, /const createNewProject = \(\) =>/);
  assert.match(source, /setHtml\(starterHtml\)/);
  assert.match(source, /setCss\(starterCss\)/);
  assert.match(source, /setJavascript\(starterJs\)/);
  assert.match(source, /setHtml\(''\)/);
  assert.match(source, /setCss\(''\)/);
  assert.match(source, /setJavascript\(''\)/);
});

test('BuildWorkspace provides separate editor tabs for HTML, CSS, and JavaScript', () => {
  assert.match(source, /type BuildTab = 'html' \| 'css' \| 'javascript' \| 'preview'/);
  assert.match(source, /html: 'html'/);
  assert.match(source, /css: 'css'/);
  assert.match(source, /javascript: 'javascript'/);
});
