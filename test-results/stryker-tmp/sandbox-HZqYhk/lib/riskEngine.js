// @ts-nocheck
// Local "AI" risk engine — simulates scoring, flags, recommendations.
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
export const riskQuestions = stryMutAct_9fa48("1831") ? [] : (stryCov_9fa48("1831"), [stryMutAct_9fa48("1832") ? {} : (stryCov_9fa48("1832"), {
  id: stryMutAct_9fa48("1833") ? "" : (stryCov_9fa48("1833"), "competitor"),
  label: stryMutAct_9fa48("1834") ? "" : (stryCov_9fa48("1834"), "Counterparty is or may be a competitor?"),
  weight: 18,
  category: stryMutAct_9fa48("1835") ? "" : (stryCov_9fa48("1835"), "Strategic")
}), stryMutAct_9fa48("1836") ? {} : (stryCov_9fa48("1836"), {
  id: stryMutAct_9fa48("1837") ? "" : (stryCov_9fa48("1837"), "ma"),
  label: stryMutAct_9fa48("1838") ? "" : (stryCov_9fa48("1838"), "Discussions involve M&A, JV, or investment?"),
  weight: 16,
  category: stryMutAct_9fa48("1839") ? "" : (stryCov_9fa48("1839"), "Strategic")
}), stryMutAct_9fa48("1840") ? {} : (stryCov_9fa48("1840"), {
  id: stryMutAct_9fa48("1841") ? "" : (stryCov_9fa48("1841"), "international"),
  label: stryMutAct_9fa48("1842") ? "" : (stryCov_9fa48("1842"), "Counterparty operates internationally?"),
  weight: 6,
  category: stryMutAct_9fa48("1843") ? "" : (stryCov_9fa48("1843"), "Geographic")
}), stryMutAct_9fa48("1844") ? {} : (stryCov_9fa48("1844"), {
  id: stryMutAct_9fa48("1845") ? "" : (stryCov_9fa48("1845"), "newIp"),
  label: stryMutAct_9fa48("1846") ? "" : (stryCov_9fa48("1846"), "New or unreleased IP will be discussed?"),
  weight: 14,
  category: stryMutAct_9fa48("1847") ? "" : (stryCov_9fa48("1847"), "IP")
}), stryMutAct_9fa48("1848") ? {} : (stryCov_9fa48("1848"), {
  id: stryMutAct_9fa48("1849") ? "" : (stryCov_9fa48("1849"), "similarProducts"),
  label: stryMutAct_9fa48("1850") ? "" : (stryCov_9fa48("1850"), "Counterparty has similar products/services?"),
  weight: 12,
  category: stryMutAct_9fa48("1851") ? "" : (stryCov_9fa48("1851"), "Strategic")
}), stryMutAct_9fa48("1852") ? {} : (stryCov_9fa48("1852"), {
  id: stryMutAct_9fa48("1853") ? "" : (stryCov_9fa48("1853"), "thirdParty"),
  label: stryMutAct_9fa48("1854") ? "" : (stryCov_9fa48("1854"), "Third-party confidential information involved?"),
  weight: 10,
  category: stryMutAct_9fa48("1855") ? "" : (stryCov_9fa48("1855"), "IP")
}), stryMutAct_9fa48("1856") ? {} : (stryCov_9fa48("1856"), {
  id: stryMutAct_9fa48("1857") ? "" : (stryCov_9fa48("1857"), "pricingStrategy"),
  label: stryMutAct_9fa48("1858") ? "" : (stryCov_9fa48("1858"), "Pricing, strategy, or roadmap will be shared?"),
  weight: 12,
  category: stryMutAct_9fa48("1859") ? "" : (stryCov_9fa48("1859"), "Strategic")
}), stryMutAct_9fa48("1860") ? {} : (stryCov_9fa48("1860"), {
  id: stryMutAct_9fa48("1861") ? "" : (stryCov_9fa48("1861"), "pii"),
  label: stryMutAct_9fa48("1862") ? "" : (stryCov_9fa48("1862"), "Personally Identifiable Information (PII) shared?"),
  weight: 14,
  category: stryMutAct_9fa48("1863") ? "" : (stryCov_9fa48("1863"), "Privacy")
}), stryMutAct_9fa48("1864") ? {} : (stryCov_9fa48("1864"), {
  id: stryMutAct_9fa48("1865") ? "" : (stryCov_9fa48("1865"), "employeeData"),
  label: stryMutAct_9fa48("1866") ? "" : (stryCov_9fa48("1866"), "Employee data will be shared?"),
  weight: 10,
  category: stryMutAct_9fa48("1867") ? "" : (stryCov_9fa48("1867"), "Privacy")
}), stryMutAct_9fa48("1868") ? {} : (stryCov_9fa48("1868"), {
  id: stryMutAct_9fa48("1869") ? "" : (stryCov_9fa48("1869"), "customerData"),
  label: stryMutAct_9fa48("1870") ? "" : (stryCov_9fa48("1870"), "Customer data will be shared?"),
  weight: 12,
  category: stryMutAct_9fa48("1871") ? "" : (stryCov_9fa48("1871"), "Privacy")
}), stryMutAct_9fa48("1872") ? {} : (stryCov_9fa48("1872"), {
  id: stryMutAct_9fa48("1873") ? "" : (stryCov_9fa48("1873"), "largeData"),
  label: stryMutAct_9fa48("1874") ? "" : (stryCov_9fa48("1874"), "Large data files (>1GB) will be exchanged?"),
  weight: 6,
  category: stryMutAct_9fa48("1875") ? "" : (stryCov_9fa48("1875"), "Data")
}), stryMutAct_9fa48("1876") ? {} : (stryCov_9fa48("1876"), {
  id: stryMutAct_9fa48("1877") ? "" : (stryCov_9fa48("1877"), "crossBorder"),
  label: stryMutAct_9fa48("1878") ? "" : (stryCov_9fa48("1878"), "Cross-border data transfer involved?"),
  weight: 14,
  category: stryMutAct_9fa48("1879") ? "" : (stryCov_9fa48("1879"), "Privacy")
})]);
export function computeRisk(answers = {}) {
  if (stryMutAct_9fa48("1880")) {
    {}
  } else {
    stryCov_9fa48("1880");
    let score = 0;
    const flags = stryMutAct_9fa48("1881") ? ["Stryker was here"] : (stryCov_9fa48("1881"), []);
    const categories = {};
    for (const q of riskQuestions) {
      if (stryMutAct_9fa48("1882")) {
        {}
      } else {
        stryCov_9fa48("1882");
        if (stryMutAct_9fa48("1884") ? false : stryMutAct_9fa48("1883") ? true : (stryCov_9fa48("1883", "1884"), answers[q.id])) {
          if (stryMutAct_9fa48("1885")) {
            {}
          } else {
            stryCov_9fa48("1885");
            stryMutAct_9fa48("1886") ? score -= q.weight : (stryCov_9fa48("1886"), score += q.weight);
            flags.push(stryMutAct_9fa48("1887") ? {} : (stryCov_9fa48("1887"), {
              id: q.id,
              label: q.label,
              category: q.category,
              weight: q.weight
            }));
            categories[q.category] = stryMutAct_9fa48("1888") ? (categories[q.category] || 0) - q.weight : (stryCov_9fa48("1888"), (stryMutAct_9fa48("1891") ? categories[q.category] && 0 : stryMutAct_9fa48("1890") ? false : stryMutAct_9fa48("1889") ? true : (stryCov_9fa48("1889", "1890", "1891"), categories[q.category] || 0)) + q.weight);
          }
        }
      }
    }

    // Combo amplifiers
    if (stryMutAct_9fa48("1894") ? answers.pii || answers.crossBorder : stryMutAct_9fa48("1893") ? false : stryMutAct_9fa48("1892") ? true : (stryCov_9fa48("1892", "1893", "1894"), answers.pii && answers.crossBorder)) {
      if (stryMutAct_9fa48("1895")) {
        {}
      } else {
        stryCov_9fa48("1895");
        stryMutAct_9fa48("1896") ? score -= 8 : (stryCov_9fa48("1896"), score += 8);
        flags.push(stryMutAct_9fa48("1897") ? {} : (stryCov_9fa48("1897"), {
          id: stryMutAct_9fa48("1898") ? "" : (stryCov_9fa48("1898"), "combo-pii-cb"),
          label: stryMutAct_9fa48("1899") ? "" : (stryCov_9fa48("1899"), "PII + Cross-border transfer (GDPR/Schrems II exposure)"),
          category: stryMutAct_9fa48("1900") ? "" : (stryCov_9fa48("1900"), "Privacy"),
          weight: 8
        }));
      }
    }
    if (stryMutAct_9fa48("1903") ? answers.competitor || answers.pricingStrategy : stryMutAct_9fa48("1902") ? false : stryMutAct_9fa48("1901") ? true : (stryCov_9fa48("1901", "1902", "1903"), answers.competitor && answers.pricingStrategy)) {
      if (stryMutAct_9fa48("1904")) {
        {}
      } else {
        stryCov_9fa48("1904");
        stryMutAct_9fa48("1905") ? score -= 6 : (stryCov_9fa48("1905"), score += 6);
        flags.push(stryMutAct_9fa48("1906") ? {} : (stryCov_9fa48("1906"), {
          id: stryMutAct_9fa48("1907") ? "" : (stryCov_9fa48("1907"), "combo-comp-strat"),
          label: stryMutAct_9fa48("1908") ? "" : (stryCov_9fa48("1908"), "Competitor + strategy disclosure"),
          category: stryMutAct_9fa48("1909") ? "" : (stryCov_9fa48("1909"), "Strategic"),
          weight: 6
        }));
      }
    }
    if (stryMutAct_9fa48("1912") ? answers.ma || answers.newIp : stryMutAct_9fa48("1911") ? false : stryMutAct_9fa48("1910") ? true : (stryCov_9fa48("1910", "1911", "1912"), answers.ma && answers.newIp)) {
      if (stryMutAct_9fa48("1913")) {
        {}
      } else {
        stryCov_9fa48("1913");
        stryMutAct_9fa48("1914") ? score -= 6 : (stryCov_9fa48("1914"), score += 6);
        flags.push(stryMutAct_9fa48("1915") ? {} : (stryCov_9fa48("1915"), {
          id: stryMutAct_9fa48("1916") ? "" : (stryCov_9fa48("1916"), "combo-ma-ip"),
          label: stryMutAct_9fa48("1917") ? "" : (stryCov_9fa48("1917"), "M&A discussions + unreleased IP"),
          category: stryMutAct_9fa48("1918") ? "" : (stryCov_9fa48("1918"), "IP"),
          weight: 6
        }));
      }
    }
    score = stryMutAct_9fa48("1919") ? Math.max(100, score) : (stryCov_9fa48("1919"), Math.min(100, score));
    let level = stryMutAct_9fa48("1920") ? "" : (stryCov_9fa48("1920"), "Low");
    if (stryMutAct_9fa48("1924") ? score < 55 : stryMutAct_9fa48("1923") ? score > 55 : stryMutAct_9fa48("1922") ? false : stryMutAct_9fa48("1921") ? true : (stryCov_9fa48("1921", "1922", "1923", "1924"), score >= 55)) level = stryMutAct_9fa48("1925") ? "" : (stryCov_9fa48("1925"), "High");else if (stryMutAct_9fa48("1929") ? score < 28 : stryMutAct_9fa48("1928") ? score > 28 : stryMutAct_9fa48("1927") ? false : stryMutAct_9fa48("1926") ? true : (stryCov_9fa48("1926", "1927", "1928", "1929"), score >= 28)) level = stryMutAct_9fa48("1930") ? "" : (stryCov_9fa48("1930"), "Medium");
    return stryMutAct_9fa48("1931") ? {} : (stryCov_9fa48("1931"), {
      score,
      level,
      flags,
      categories
    });
  }
}
export function recommendTemplate(answers, level) {
  if (stryMutAct_9fa48("1932")) {
    {}
  } else {
    stryCov_9fa48("1932");
    if (stryMutAct_9fa48("1934") ? false : stryMutAct_9fa48("1933") ? true : (stryCov_9fa48("1933", "1934"), answers.ma)) return stryMutAct_9fa48("1935") ? {} : (stryCov_9fa48("1935"), {
      id: stryMutAct_9fa48("1936") ? "" : (stryCov_9fa48("1936"), "t-ma"),
      name: stryMutAct_9fa48("1937") ? "" : (stryCov_9fa48("1937"), "M&A Due Diligence NDA")
    });
    if (stryMutAct_9fa48("1940") ? (level === "High" || answers.newIp) && answers.competitor : stryMutAct_9fa48("1939") ? false : stryMutAct_9fa48("1938") ? true : (stryCov_9fa48("1938", "1939", "1940"), (stryMutAct_9fa48("1942") ? level === "High" && answers.newIp : stryMutAct_9fa48("1941") ? false : (stryCov_9fa48("1941", "1942"), (stryMutAct_9fa48("1944") ? level !== "High" : stryMutAct_9fa48("1943") ? false : (stryCov_9fa48("1943", "1944"), level === (stryMutAct_9fa48("1945") ? "" : (stryCov_9fa48("1945"), "High")))) || answers.newIp)) || answers.competitor)) return stryMutAct_9fa48("1946") ? {} : (stryCov_9fa48("1946"), {
      id: stryMutAct_9fa48("1947") ? "" : (stryCov_9fa48("1947"), "t-strict-mutual"),
      name: stryMutAct_9fa48("1948") ? "" : (stryCov_9fa48("1948"), "Strict Mutual NDA (IP-heavy)")
    });
    if (stryMutAct_9fa48("1951") ? answers.type !== "vendor" : stryMutAct_9fa48("1950") ? false : stryMutAct_9fa48("1949") ? true : (stryCov_9fa48("1949", "1950", "1951"), answers.type === (stryMutAct_9fa48("1952") ? "" : (stryCov_9fa48("1952"), "vendor")))) return stryMutAct_9fa48("1953") ? {} : (stryCov_9fa48("1953"), {
      id: stryMutAct_9fa48("1954") ? "" : (stryCov_9fa48("1954"), "t-vendor"),
      name: stryMutAct_9fa48("1955") ? "" : (stryCov_9fa48("1955"), "Vendor NDA — Lite")
    });
    if (stryMutAct_9fa48("1958") ? answers.direction !== "incoming" : stryMutAct_9fa48("1957") ? false : stryMutAct_9fa48("1956") ? true : (stryCov_9fa48("1956", "1957", "1958"), answers.direction === (stryMutAct_9fa48("1959") ? "" : (stryCov_9fa48("1959"), "incoming")))) return stryMutAct_9fa48("1960") ? {} : (stryCov_9fa48("1960"), {
      id: stryMutAct_9fa48("1961") ? "" : (stryCov_9fa48("1961"), "t-incoming"),
      name: stryMutAct_9fa48("1962") ? "" : (stryCov_9fa48("1962"), "One-Way Incoming v3.0")
    });
    if (stryMutAct_9fa48("1965") ? answers.direction !== "outgoing" : stryMutAct_9fa48("1964") ? false : stryMutAct_9fa48("1963") ? true : (stryCov_9fa48("1963", "1964", "1965"), answers.direction === (stryMutAct_9fa48("1966") ? "" : (stryCov_9fa48("1966"), "outgoing")))) return stryMutAct_9fa48("1967") ? {} : (stryCov_9fa48("1967"), {
      id: stryMutAct_9fa48("1968") ? "" : (stryCov_9fa48("1968"), "t-outgoing"),
      name: stryMutAct_9fa48("1969") ? "" : (stryCov_9fa48("1969"), "One-Way Outgoing v3.1")
    });
    return stryMutAct_9fa48("1970") ? {} : (stryCov_9fa48("1970"), {
      id: stryMutAct_9fa48("1971") ? "" : (stryCov_9fa48("1971"), "t-std-mutual"),
      name: stryMutAct_9fa48("1972") ? "" : (stryCov_9fa48("1972"), "Standard Mutual NDA v4.2")
    });
  }
}
export function recommendWorkflow(level, answers) {
  if (stryMutAct_9fa48("1973")) {
    {}
  } else {
    stryCov_9fa48("1973");
    const steps = stryMutAct_9fa48("1974") ? [] : (stryCov_9fa48("1974"), [stryMutAct_9fa48("1975") ? "" : (stryCov_9fa48("1975"), "Legal Ops triage")]);
    if (stryMutAct_9fa48("1978") ? level !== "Low" : stryMutAct_9fa48("1977") ? false : stryMutAct_9fa48("1976") ? true : (stryCov_9fa48("1976", "1977", "1978"), level === (stryMutAct_9fa48("1979") ? "" : (stryCov_9fa48("1979"), "Low")))) {
      if (stryMutAct_9fa48("1980")) {
        {}
      } else {
        stryCov_9fa48("1980");
        steps.push(stryMutAct_9fa48("1981") ? "" : (stryCov_9fa48("1981"), "Auto-approve (template match)"));
        steps.push(stryMutAct_9fa48("1982") ? "" : (stryCov_9fa48("1982"), "Send for signature"));
      }
    } else if (stryMutAct_9fa48("1985") ? level !== "Medium" : stryMutAct_9fa48("1984") ? false : stryMutAct_9fa48("1983") ? true : (stryCov_9fa48("1983", "1984", "1985"), level === (stryMutAct_9fa48("1986") ? "" : (stryCov_9fa48("1986"), "Medium")))) {
      if (stryMutAct_9fa48("1987")) {
        {}
      } else {
        stryCov_9fa48("1987");
        steps.push(stryMutAct_9fa48("1988") ? "" : (stryCov_9fa48("1988"), "Counsel review (1 reviewer)"));
        if (stryMutAct_9fa48("1990") ? false : stryMutAct_9fa48("1989") ? true : (stryCov_9fa48("1989", "1990"), answers.pii)) steps.push(stryMutAct_9fa48("1991") ? "" : (stryCov_9fa48("1991"), "Privacy Office sign-off"));
        steps.push(stryMutAct_9fa48("1992") ? "" : (stryCov_9fa48("1992"), "Send for signature"));
      }
    } else {
      if (stryMutAct_9fa48("1993")) {
        {}
      } else {
        stryCov_9fa48("1993");
        steps.push(stryMutAct_9fa48("1994") ? "" : (stryCov_9fa48("1994"), "Senior Counsel review"));
        if (stryMutAct_9fa48("1996") ? false : stryMutAct_9fa48("1995") ? true : (stryCov_9fa48("1995", "1996"), answers.ma)) steps.push(stryMutAct_9fa48("1997") ? "" : (stryCov_9fa48("1997"), "CLO approval"));
        if (stryMutAct_9fa48("2000") ? answers.pii && answers.crossBorder : stryMutAct_9fa48("1999") ? false : stryMutAct_9fa48("1998") ? true : (stryCov_9fa48("1998", "1999", "2000"), answers.pii || answers.crossBorder)) steps.push(stryMutAct_9fa48("2001") ? "" : (stryCov_9fa48("2001"), "Privacy Officer + DPO review"));
        if (stryMutAct_9fa48("2004") ? answers.newIp && answers.competitor : stryMutAct_9fa48("2003") ? false : stryMutAct_9fa48("2002") ? true : (stryCov_9fa48("2002", "2003", "2004"), answers.newIp || answers.competitor)) steps.push(stryMutAct_9fa48("2005") ? "" : (stryCov_9fa48("2005"), "CISO + IP Lead review"));
        steps.push(stryMutAct_9fa48("2006") ? "" : (stryCov_9fa48("2006"), "Final CLO sign-off"));
        steps.push(stryMutAct_9fa48("2007") ? "" : (stryCov_9fa48("2007"), "Send for signature"));
      }
    }
    return steps;
  }
}
export function recommendClauses(answers, level) {
  if (stryMutAct_9fa48("2008")) {
    {}
  } else {
    stryCov_9fa48("2008");
    const clauses = stryMutAct_9fa48("2009") ? [] : (stryCov_9fa48("2009"), [stryMutAct_9fa48("2010") ? {} : (stryCov_9fa48("2010"), {
      name: stryMutAct_9fa48("2011") ? "" : (stryCov_9fa48("2011"), "Definition of Confidential Information"),
      strength: stryMutAct_9fa48("2012") ? "" : (stryCov_9fa48("2012"), "Standard")
    }), stryMutAct_9fa48("2013") ? {} : (stryCov_9fa48("2013"), {
      name: stryMutAct_9fa48("2014") ? "" : (stryCov_9fa48("2014"), "Term & Survival (3 years post-termination)"),
      strength: stryMutAct_9fa48("2015") ? "" : (stryCov_9fa48("2015"), "Standard")
    })]);
    if (stryMutAct_9fa48("2018") ? answers.newIp && answers.competitor : stryMutAct_9fa48("2017") ? false : stryMutAct_9fa48("2016") ? true : (stryCov_9fa48("2016", "2017", "2018"), answers.newIp || answers.competitor)) {
      if (stryMutAct_9fa48("2019")) {
        {}
      } else {
        stryCov_9fa48("2019");
        clauses.push(stryMutAct_9fa48("2020") ? {} : (stryCov_9fa48("2020"), {
          name: stryMutAct_9fa48("2021") ? "" : (stryCov_9fa48("2021"), "Residuals clause — REMOVED"),
          strength: stryMutAct_9fa48("2022") ? "" : (stryCov_9fa48("2022"), "Strict")
        }));
        clauses.push(stryMutAct_9fa48("2023") ? {} : (stryCov_9fa48("2023"), {
          name: stryMutAct_9fa48("2024") ? "" : (stryCov_9fa48("2024"), "IP non-use / non-derivation"),
          strength: stryMutAct_9fa48("2025") ? "" : (stryCov_9fa48("2025"), "Strict")
        }));
      }
    }
    if (stryMutAct_9fa48("2028") ? (answers.pii || answers.customerData) && answers.employeeData : stryMutAct_9fa48("2027") ? false : stryMutAct_9fa48("2026") ? true : (stryCov_9fa48("2026", "2027", "2028"), (stryMutAct_9fa48("2030") ? answers.pii && answers.customerData : stryMutAct_9fa48("2029") ? false : (stryCov_9fa48("2029", "2030"), answers.pii || answers.customerData)) || answers.employeeData)) {
      if (stryMutAct_9fa48("2031")) {
        {}
      } else {
        stryCov_9fa48("2031");
        clauses.push(stryMutAct_9fa48("2032") ? {} : (stryCov_9fa48("2032"), {
          name: stryMutAct_9fa48("2033") ? "" : (stryCov_9fa48("2033"), "Data Processing Addendum (DPA)"),
          strength: stryMutAct_9fa48("2034") ? "" : (stryCov_9fa48("2034"), "Required")
        }));
        clauses.push(stryMutAct_9fa48("2035") ? {} : (stryCov_9fa48("2035"), {
          name: stryMutAct_9fa48("2036") ? "" : (stryCov_9fa48("2036"), "Breach notification within 48 hours"),
          strength: stryMutAct_9fa48("2037") ? "" : (stryCov_9fa48("2037"), "Strict")
        }));
      }
    }
    if (stryMutAct_9fa48("2039") ? false : stryMutAct_9fa48("2038") ? true : (stryCov_9fa48("2038", "2039"), answers.crossBorder)) {
      if (stryMutAct_9fa48("2040")) {
        {}
      } else {
        stryCov_9fa48("2040");
        clauses.push(stryMutAct_9fa48("2041") ? {} : (stryCov_9fa48("2041"), {
          name: stryMutAct_9fa48("2042") ? "" : (stryCov_9fa48("2042"), "Standard Contractual Clauses (SCCs)"),
          strength: stryMutAct_9fa48("2043") ? "" : (stryCov_9fa48("2043"), "Required")
        }));
        clauses.push(stryMutAct_9fa48("2044") ? {} : (stryCov_9fa48("2044"), {
          name: stryMutAct_9fa48("2045") ? "" : (stryCov_9fa48("2045"), "Cross-border transfer impact assessment"),
          strength: stryMutAct_9fa48("2046") ? "" : (stryCov_9fa48("2046"), "Required")
        }));
      }
    }
    if (stryMutAct_9fa48("2048") ? false : stryMutAct_9fa48("2047") ? true : (stryCov_9fa48("2047", "2048"), answers.ma)) {
      if (stryMutAct_9fa48("2049")) {
        {}
      } else {
        stryCov_9fa48("2049");
        clauses.push(stryMutAct_9fa48("2050") ? {} : (stryCov_9fa48("2050"), {
          name: stryMutAct_9fa48("2051") ? "" : (stryCov_9fa48("2051"), "Standstill — 12 months"),
          strength: stryMutAct_9fa48("2052") ? "" : (stryCov_9fa48("2052"), "Strict")
        }));
        clauses.push(stryMutAct_9fa48("2053") ? {} : (stryCov_9fa48("2053"), {
          name: stryMutAct_9fa48("2054") ? "" : (stryCov_9fa48("2054"), "Non-solicitation of employees"),
          strength: stryMutAct_9fa48("2055") ? "" : (stryCov_9fa48("2055"), "Strict")
        }));
      }
    }
    if (stryMutAct_9fa48("2057") ? false : stryMutAct_9fa48("2056") ? true : (stryCov_9fa48("2056", "2057"), answers.thirdParty)) {
      if (stryMutAct_9fa48("2058")) {
        {}
      } else {
        stryCov_9fa48("2058");
        clauses.push(stryMutAct_9fa48("2059") ? {} : (stryCov_9fa48("2059"), {
          name: stryMutAct_9fa48("2060") ? "" : (stryCov_9fa48("2060"), "Third-party confidentiality flow-down"),
          strength: stryMutAct_9fa48("2061") ? "" : (stryCov_9fa48("2061"), "Required")
        }));
      }
    }
    if (stryMutAct_9fa48("2064") ? level === "Low" : stryMutAct_9fa48("2063") ? false : stryMutAct_9fa48("2062") ? true : (stryCov_9fa48("2062", "2063", "2064"), level !== (stryMutAct_9fa48("2065") ? "" : (stryCov_9fa48("2065"), "Low")))) {
      if (stryMutAct_9fa48("2066")) {
        {}
      } else {
        stryCov_9fa48("2066");
        clauses.push(stryMutAct_9fa48("2067") ? {} : (stryCov_9fa48("2067"), {
          name: stryMutAct_9fa48("2068") ? "" : (stryCov_9fa48("2068"), "Injunctive relief & equitable remedies"),
          strength: stryMutAct_9fa48("2069") ? "" : (stryCov_9fa48("2069"), "Strict")
        }));
        clauses.push(stryMutAct_9fa48("2070") ? {} : (stryCov_9fa48("2070"), {
          name: stryMutAct_9fa48("2071") ? "" : (stryCov_9fa48("2071"), "Choice of law: Delaware (US) / arbitration ICC"),
          strength: stryMutAct_9fa48("2072") ? "" : (stryCov_9fa48("2072"), "Standard")
        }));
      }
    }
    return clauses;
  }
}
export function aiExplanation(score, level, flags, answers) {
  if (stryMutAct_9fa48("2073")) {
    {}
  } else {
    stryCov_9fa48("2073");
    const parts = stryMutAct_9fa48("2074") ? ["Stryker was here"] : (stryCov_9fa48("2074"), []);
    parts.push(stryMutAct_9fa48("2075") ? `` : (stryCov_9fa48("2075"), `NDAFlow AI analyzed ${flags.length} risk signals across ${Object.keys(flags.reduce(stryMutAct_9fa48("2076") ? () => undefined : (stryCov_9fa48("2076"), (a, f) => (a[f.category] = 1, a)), {})).length} categories.`));
    if (stryMutAct_9fa48("2079") ? level !== "High" : stryMutAct_9fa48("2078") ? false : stryMutAct_9fa48("2077") ? true : (stryCov_9fa48("2077", "2078", "2079"), level === (stryMutAct_9fa48("2080") ? "" : (stryCov_9fa48("2080"), "High")))) {
      if (stryMutAct_9fa48("2081")) {
        {}
      } else {
        stryCov_9fa48("2081");
        parts.push(stryMutAct_9fa48("2082") ? "" : (stryCov_9fa48("2082"), "This request is **High Risk** because it combines strategically sensitive disclosures with regulated data and/or M&A context."));
      }
    } else if (stryMutAct_9fa48("2085") ? level !== "Medium" : stryMutAct_9fa48("2084") ? false : stryMutAct_9fa48("2083") ? true : (stryCov_9fa48("2083", "2084", "2085"), level === (stryMutAct_9fa48("2086") ? "" : (stryCov_9fa48("2086"), "Medium")))) {
      if (stryMutAct_9fa48("2087")) {
        {}
      } else {
        stryCov_9fa48("2087");
        parts.push(stryMutAct_9fa48("2088") ? "" : (stryCov_9fa48("2088"), "This request is **Medium Risk** — manageable with standard counsel review and targeted clauses."));
      }
    } else {
      if (stryMutAct_9fa48("2089")) {
        {}
      } else {
        stryCov_9fa48("2089");
        parts.push(stryMutAct_9fa48("2090") ? "" : (stryCov_9fa48("2090"), "This request is **Low Risk** and can typically be auto-approved with the standard template."));
      }
    }
    if (stryMutAct_9fa48("2093") ? answers.pii || answers.crossBorder : stryMutAct_9fa48("2092") ? false : stryMutAct_9fa48("2091") ? true : (stryCov_9fa48("2091", "2092", "2093"), answers.pii && answers.crossBorder)) {
      if (stryMutAct_9fa48("2094")) {
        {}
      } else {
        stryCov_9fa48("2094");
        parts.push(stryMutAct_9fa48("2095") ? "" : (stryCov_9fa48("2095"), "Privacy exposure is elevated due to PII + cross-border transfer; SCCs and a DPA are recommended."));
      }
    }
    if (stryMutAct_9fa48("2097") ? false : stryMutAct_9fa48("2096") ? true : (stryCov_9fa48("2096", "2097"), answers.competitor)) {
      if (stryMutAct_9fa48("2098")) {
        {}
      } else {
        stryCov_9fa48("2098");
        parts.push(stryMutAct_9fa48("2099") ? "" : (stryCov_9fa48("2099"), "Competitive overlap detected — recommending strict residuals removal and use restrictions."));
      }
    }
    if (stryMutAct_9fa48("2101") ? false : stryMutAct_9fa48("2100") ? true : (stryCov_9fa48("2100", "2101"), answers.ma)) {
      if (stryMutAct_9fa48("2102")) {
        {}
      } else {
        stryCov_9fa48("2102");
        parts.push(stryMutAct_9fa48("2103") ? "" : (stryCov_9fa48("2103"), "M&A context detected — adding standstill and non-solicit, escalating to CLO."));
      }
    }
    parts.push(stryMutAct_9fa48("2104") ? `` : (stryCov_9fa48("2104"), `Composite risk score: **${score}/100**.`));
    return parts.join(stryMutAct_9fa48("2105") ? "" : (stryCov_9fa48("2105"), " "));
  }
}
export function generateMockNda({
  counterparty,
  recordTitle,
  level,
  clauses,
  template,
  jurisdiction = stryMutAct_9fa48("2106") ? "" : (stryCov_9fa48("2106"), "Delaware, USA")
}) {
  if (stryMutAct_9fa48("2107")) {
    {}
  } else {
    stryCov_9fa48("2107");
    const date = new Date().toLocaleDateString(stryMutAct_9fa48("2108") ? "" : (stryCov_9fa48("2108"), "en-US"), stryMutAct_9fa48("2109") ? {} : (stryCov_9fa48("2109"), {
      year: stryMutAct_9fa48("2110") ? "" : (stryCov_9fa48("2110"), "numeric"),
      month: stryMutAct_9fa48("2111") ? "" : (stryCov_9fa48("2111"), "long"),
      day: stryMutAct_9fa48("2112") ? "" : (stryCov_9fa48("2112"), "numeric")
    }));
    const cp = stryMutAct_9fa48("2115") ? counterparty && "[Counterparty Name]" : stryMutAct_9fa48("2114") ? false : stryMutAct_9fa48("2113") ? true : (stryCov_9fa48("2113", "2114", "2115"), counterparty || (stryMutAct_9fa48("2116") ? "" : (stryCov_9fa48("2116"), "[Counterparty Name]")));
    const title = stryMutAct_9fa48("2119") ? recordTitle && "[Engagement Title]" : stryMutAct_9fa48("2118") ? false : stryMutAct_9fa48("2117") ? true : (stryCov_9fa48("2117", "2118", "2119"), recordTitle || (stryMutAct_9fa48("2120") ? "" : (stryCov_9fa48("2120"), "[Engagement Title]")));
    const clauseList = clauses.map(stryMutAct_9fa48("2121") ? () => undefined : (stryCov_9fa48("2121"), (c, i) => stryMutAct_9fa48("2122") ? `` : (stryCov_9fa48("2122"), `${stryMutAct_9fa48("2123") ? i - 1 : (stryCov_9fa48("2123"), i + 1)}. ${c.name}${(stryMutAct_9fa48("2126") ? c.strength === "Standard" : stryMutAct_9fa48("2125") ? false : stryMutAct_9fa48("2124") ? true : (stryCov_9fa48("2124", "2125", "2126"), c.strength !== (stryMutAct_9fa48("2127") ? "" : (stryCov_9fa48("2127"), "Standard")))) ? stryMutAct_9fa48("2128") ? `` : (stryCov_9fa48("2128"), ` — (${c.strength})`) : stryMutAct_9fa48("2129") ? "Stryker was here!" : (stryCov_9fa48("2129"), "")}`))).join(stryMutAct_9fa48("2130") ? "" : (stryCov_9fa48("2130"), "\n"));
    return stryMutAct_9fa48("2131") ? `` : (stryCov_9fa48("2131"), `MUTUAL NON-DISCLOSURE AGREEMENT
(Generated by NDAFlow AI — ${stryMutAct_9fa48("2134") ? template?.name && "Standard Template" : stryMutAct_9fa48("2133") ? false : stryMutAct_9fa48("2132") ? true : (stryCov_9fa48("2132", "2133", "2134"), (stryMutAct_9fa48("2135") ? template.name : (stryCov_9fa48("2135"), template?.name)) || (stryMutAct_9fa48("2136") ? "" : (stryCov_9fa48("2136"), "Standard Template")))})

This Non-Disclosure Agreement ("Agreement") is entered into as of ${date} by and between:

  Contoso Corporation, a Delaware corporation ("Contoso"), and
  ${cp} ("Counterparty"),

each a "Party" and collectively the "Parties", in connection with: ${title}.

1. PURPOSE
   The Parties wish to explore a potential business relationship and may disclose
   certain Confidential Information to one another. Risk classification: ${level}.

2. CONFIDENTIAL INFORMATION
   "Confidential Information" means any non-public information disclosed by one
   Party to the other, whether orally, in writing or electronically, that is
   designated as confidential or that reasonably should be understood to be
   confidential given the nature of the information and circumstances of disclosure.

3. OBLIGATIONS
   Each Party shall (a) protect Confidential Information using at least the same
   degree of care it uses for its own confidential information, but no less than a
   reasonable degree of care, and (b) use it solely for the Purpose.

4. RECOMMENDED CLAUSES (auto-inserted by NDAFlow AI)
${clauseList}

5. TERM
   This Agreement shall remain in effect for two (2) years from the Effective Date.
   Confidentiality obligations shall survive for three (3) years thereafter.

6. GOVERNING LAW
   This Agreement shall be governed by the laws of ${jurisdiction}, without regard
   to its conflict of laws principles.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first
written above.

Contoso Corporation                           ${cp}
By: _________________________                 By: _________________________
Name:                                         Name:
Title:                                        Title:
Date:                                         Date:

— END OF DRAFT —
`);
  }
}