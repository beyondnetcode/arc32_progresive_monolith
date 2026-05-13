# BMAD-METHOD Global Enforceable Rules

This document defines the core enforceable agent instructions for the local AI agent harness within this BMAD-METHOD project. 

### R-01 · Bilingual Documentation Sync
- **Scope (Agents)**: po, architect, analyst, dev, qa, sm
- **Trigger**: Any creation or modification of a document, user story, use case, or diagram.
- **Instruction**: Every document, user story, use case, and diagram must be maintained in both Spanish and English simultaneously. When content is created or updated in one language, the equivalent artifact in the other language must be updated in the same execution. Never leave a language version outdated or out of sync.

### R-02 · Contextual Architecture Awareness (Context7)
- **Scope (Agents)**: architect, dev
- **Trigger**: Before executing any task involving architecture, tech stack references, diagrams, or technical decisions.
- **Instruction**: Always resolve and load the current project context using context7. Never make architectural assumptions from memory. Always validate against live context.

### R-03 · UTF-8 and Markdown Encoding Integrity
- **Scope (Agents)**: po, architect, analyst, dev, qa, sm
- **Trigger**: Finalizing any document output.
- **Instruction**: All generated or modified documents must be 100% UTF-8 clean. No special characters, corrupted glyphs, or encoding artifacts that could break Markdown rendering are permitted. Verify encoding integrity before finalizing any document output.

### R-04 · Diagram Language Consistency
- **Scope (Agents)**: po, architect, analyst
- **Trigger**: Creating or updating diagrams.
- **Instruction**: All diagram element labels must match the language of the document they belong to. Spanish document = Spanish labels. English document = English labels. Cross-language diagrams are not permitted unless explicitly requested.

### R-05 · Tech Stack Coherence Enforcement
- **Scope (Agents)**: architect, dev, analyst
- **Trigger**: Processing any technical reference in functional or architectural documentation.
- **Instruction**: Any technical reference in functional or architectural documentation must be validated against the approved project tech stack. Flag undeclared technologies and missing stack components from relevant documentation.

### R-06 · UC and Story Separation of Concerns
- **Scope (Agents)**: po, analyst, architect
- **Trigger**: Before creation or update of Use Cases (UCs) or stories.
- **Instruction**: Classify all UCs and stories: FUNCTIONAL (business behavior, user goals, operational rules only), TECHNICAL (system behavior, infrastructure, integrations, architecture), TECHNICAL_ENABLER (NFRs, security, performance, architectural decisions). MIXED stories must be split before backlog acceptance. Never merge business logic with implementation details in a single UC.

### R-07 · UC Traceability on Diagram Updates
- **Scope (Agents)**: po, architect, analyst
- **Trigger**: When a UC is created or updated.
- **Instruction**: All impacted diagrams must be identified and updated in the same execution. Every diagram modification must log: document name, diagram type, what changed, and the UC ID that triggered the change.

### R-08 · Authentication Flow Completeness
- **Scope (Agents)**: architect, analyst, po
- **Trigger**: Creating or updating any diagram or document including login or authentication flows.
- **Instruction**: Explicitly represent both paths: IDP (federated) and Internal (native). The decision point must be clearly visible. Single-path auth diagrams are incomplete and must be flagged.

### R-09 · Functional Readability Standard
- **Scope (Agents)**: po, analyst
- **Trigger**: Writing or reviewing functional documentation.
- **Instruction**: All functional documentation must be written in plain language accessible to non-technical stakeholders. Technical jargon must not appear in FUNCTIONAL artifacts. If a technical concept is essential, include a plain-language summary.

### R-10 · Audit Report Format on Verification Tasks
- **Scope (Agents)**: qa, sm, architect
- **Trigger**: Executing any verification or quality audit task.
- **Instruction**: Any verification or quality audit task must produce a structured report per issue containing: Affected document or artifact, Location (section, diagram name, line, or UC ID), Issue type (encoding / language / stack / diagram / story-mix), Severity (critical / warning / info), and Recommended fix. No verification task is complete without this report.

### R-11 · PO-first Architect-second Execution Order
- **Scope (Agents)**: po, architect, sm
- **Trigger**: Planning execution for tasks requiring both functional and architectural analysis.
- **Instruction**: Always execute in this order: 1. PO agent (functional lens, business impact, readability). 2. Architect agent (technical lens, system coherence, stack alignment, diagrams). The Architect phase must build upon PO phase output. Never reverse or parallelize this order unless explicitly instructed.

### R-12 · Naming and Tagging Convention Enforcement
- **Scope (Agents)**: po, analyst, architect, dev, qa, sm
- **Trigger**: Creation or update of UCs, stories, epics, and technical enablers.
- **Instruction**: All UCs, stories, epics, and technical enablers must follow the project naming convention and tagging taxonomy. Apply category prefixes and tags on creation and update. Flag untagged or incorrectly named artifacts before merge.
